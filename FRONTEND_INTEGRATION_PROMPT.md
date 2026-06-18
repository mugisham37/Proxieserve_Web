# ProxiServe — Frontend Integration Prompt

You are being given comprehensive instructions to integrate the fully-built ProxiServe FastAPI backend into the Next.js 16 frontend. The backend has 65 live endpoints across 12 modules. The frontend is visually complete but is largely running on mock data. Your job is to replace every piece of mock data, every hardcoded default, and every simulated operation with real API calls — without breaking anything that already works and without changing the visual design of any page.

This is a senior-level engineering task. Read every instruction in this document completely before writing a single line. Build in the exact order given. Verify each phase before starting the next. There is no room for stubs, placeholders, or TODO comments in the finished integration.


## Section One: Mandatory Analysis Phase — Read Everything Before Touching Code

Before writing anything, read the following files completely and form a clear mental model of how the codebase is organized.

Read src/lib/api/client.ts. This is the Axios-based HTTP client that every API call goes through. Understand the request interceptors (withCredentials, headers), the response interceptors (ApiResponse envelope unwrapping, ApiError construction), the error normalization logic (how 422, 401, network errors, and timeouts are each handled), the SESSION_INVALIDATED_EVENT pattern, and the base URL configuration. Every new API function you write uses this client. Never create a second Axios instance.

Read src/lib/api/auth.ts completely. This is the gold standard integration pattern. Study how every function is written: the function signature, how it calls the apiClient, what TypeScript type it returns, and how errors are allowed to propagate upward. Your new API modules must follow this exact pattern.

Read src/lib/api/applications.ts and src/lib/api/admin.ts. These show the same pattern applied to non-auth modules. Note how admin.ts wraps the response to return the typed data directly from the ApiResponse envelope.

Read src/lib/api/types.ts. This is the central TypeScript definition file. You will be adding many new interfaces here for all the new API response types. Understand what is already defined and what needs to be added.

Read src/hooks/useAuth.ts and src/hooks/useSession.ts. These show how React Query useMutation and useQuery are wrapped into clean custom hooks. Note the queryKey arrays, the mutationFn patterns, the onSuccess cache invalidation, and how errors are surfaced back to the calling component.

Read src/hooks/useAdmin.ts. This shows how admin hooks use useMutation with optimistic invalidation of query caches. The pattern is identical for all new admin hooks.

Read src/lib/application-context.tsx completely. Understand the reducer pattern, the draft persistence to localStorage, and the BroadcastChannel multi-tab sync. The draft mechanism itself is correct and intentional — it is offline-first storage for the wizard. You are not replacing the draft mechanism. You are replacing the final submission step and the document upload step with real API calls, while keeping the draft persistence exactly as it is.

Read src/lib/services-data.ts completely. This file contains 15 hardcoded service definitions with full configurations including dynamic form fields, document requirements, and pricing tiers. You will delete this file entirely and replace every place it is imported with API calls. Make a list of everywhere it is imported before deleting it.

Read src/lib/tracker-data.ts. This file has 5 hardcoded tracker mock applications and a MOCK_TRACKER_CODES array used by generateStaticParams. You will delete this file and remove the static generation. The tracker pages will do dynamic lookups instead.

Read src/components/organisms/wizard/WizStep4Review.tsx. Find the submission logic — there is a simulated 1800ms delay with an 80% random success rate and a locally-generated PRX code. This is the critical mock that blocks all end-to-end functionality. You will replace it with a real API call.

Read src/components/organisms/wizard/WizStep3Documents.tsx. Find the simulateUpload function and the simulated photo quality check. Both are mocked. You will replace them with real file upload API calls.

Read src/lib/query-client.ts. Note the React Query configuration: staleTime 5 minutes, gcTime 10 minutes, retry false. You must not change this configuration.

Read src/app/(auth)/signup/page.tsx and the ClientSignupForm organism to see the complete end-to-end pattern of a working integration: form validation with Zod, mutation hook, error handling, context dispatch, and redirect. All your new integrations follow this same flow.

After reading all these files, you should be able to answer: Where does the services-data.ts file get imported and for what purpose in each place? What does the application wizard submit on step 4 right now and what should it submit instead? How does the document upload simulate progress and how will a real upload replace that? What queryKeys are already in use and what new ones do you need to add?


## Section Two: The Architecture You Are Integrating Into

The frontend is built on Next.js 16 with the App Router. Pages under src/app/ can be either Server Components or Client Components. Server Components run on the server and cannot use React hooks, browser APIs, or event handlers. Client Components are marked with the directive "use client" at the top and can use all React features. The current pattern is that page files are Server Components that render shell layouts, while the actual interactive organisms are Client Components that do data fetching. You must follow this pattern — never add "use client" to a page file unless absolutely necessary, and never do data fetching in a Server Component.

React Query is the data fetching layer. Every API call that populates the UI must go through a React Query hook (useQuery for reads, useMutation for writes). You must never call API functions directly from page files or components — always go through a hook. This ensures caching, loading states, error boundaries, and invalidation all work correctly.

The ApiError class is the only error type you will encounter from API calls. It has message (human-readable), errorType (machine-readable string for conditional handling), statusCode (HTTP status number), and optional data (extra context like lockout times, remaining attempts, etc.). In mutation onError callbacks, check err.errorType to branch on specific error conditions.

Every response from the backend is wrapped in the ApiResponse envelope with success, message, data, and errorType fields. The Axios client already unwraps this — when your API functions receive the response, they receive the data field directly, already typed. You do not need to check success or unwrap the envelope manually.

The auth middleware in src/middleware.ts handles route protection by reading the JWT from the proxiserve_access HTTP-only cookie. This is already working and you must not modify it. Any new pages you add under (admin), (agent), or (dashboard) route groups are automatically protected.


## Section Three: Special Technical Patterns You Must Understand Before Building

There are four technical patterns that differ from ordinary REST calls and require special handling.

The first is file uploads. Uploading documents to the backend uses multipart form data, not JSON. When you create the upload function in lib/api/documents.ts, you must build a FormData object containing the file and the requirement_key string, then pass that FormData directly to the Axios client without setting Content-Type manually. When you do not set Content-Type, Axios detects the FormData and automatically sets the correct multipart boundary header. If you manually set Content-Type to multipart/form-data without the boundary, uploads will fail silently. The upload function returns a DocumentResponse. For tracking upload progress, Axios supports an onUploadProgress callback in the request config — use this to update a progress state variable in the calling component, which is how you replace the fake progress bar in WizStep3Documents.

The second is document downloads and previews. Downloading a document from GET /api/documents/{document_id} returns a streaming binary response, not JSON. The Axios call for download must set responseType to blob in the request config. The resulting Blob can be passed to URL.createObjectURL() to create a temporary browser URL, which you then either assign to a link element and programmatically click (for download) or assign to an iframe or object src (for inline preview). Always call URL.revokeObjectURL() after the download initiates to avoid memory leaks. The backend sets Content-Disposition to control whether the browser treats the response as a download or an inline preview based on an inline query parameter.

The third is payment status polling. After initiating a mobile money payment, the frontend enters a polling loop where it checks the payment status every five seconds while the status is "processing". React Query supports this natively via the refetchInterval option on useQuery. Set refetchInterval to 5000 (five seconds) when the current status is "processing" and to false when the status has resolved to "paid", "failed", or "timed_out". This means the refetchInterval should be computed as a function that returns false when polling should stop. Additionally, when status resolves to "paid", the payment context must be updated and the user redirected to the receipt page. Handle this in an onSuccess callback or useEffect watching the data.

The fourth is dynamic Zod schema generation for the application wizard step two. The wizard's step two form is entirely dynamic — the fields are defined by the admin in the service template and fetched via GET /api/services/{slug}. The service detail response includes an application_config object with a cards array, where each card has a fields array describing each form field. Each field has a key, label, field_type (text, textarea, select, radio_card, date, switch, checkbox), required flag, options array for select types, and optional conditional logic. You must write a function called buildStep2Schema that takes this fields array and constructs a Zod schema object dynamically, where each field key maps to the appropriate Zod validator (z.string() for text, z.date() for date, z.boolean() for switch/checkbox, z.enum() for select/radio_card with the options as the enum values). Required fields use the validator directly; optional fields wrap it in .optional(). This function already exists in src/lib/application-schema.ts and may need updating based on the exact field types the backend returns.


## Section Four: TypeScript Types to Add to lib/api/types.ts

All existing types in types.ts must remain unchanged. You are adding new interfaces alongside them. The new types must exactly match the backend's response schemas — not approximately match, but exactly. Field names must use the same casing the backend returns (the backend uses camelCase in most response fields due to schema aliasing, but check each schema carefully).

For services, add ServiceStep (step_number, title, description nullable), DocumentRequirement (key, label, description nullable, doc_type, is_required, max_size_mb, allowed_mime_types array of strings, sort_order), FormFieldOption (value, label, description nullable), FormField (id, label, type, required optional boolean, optional optional boolean, help nullable, options nullable array of FormFieldOption, conditional nullable object, placeholder nullable, maxLength nullable number), AppCard (id, title, fields array of FormField), ApplicationConfig (step2Title, step2Lede, cards array of AppCard), PricingTier (tier, label, fee, governmentFee, eta, etaBusinessDays, includes array of strings, isAvailable), ServiceSummary (service_id, slug, name, category, short_description nullable, color nullable, icon nullable, status, version, is_featured, pricing_tiers array of PricingTier), ServiceDetail (extends ServiceSummary plus description nullable, created_at, updated_at, steps array of ServiceStep, requirements array of DocumentRequirement, application_config nullable ApplicationConfig), ServiceListResponse (services array of ServiceSummary).

For applications, add PersonalInfo (fullName, nationalId, dob, phone, email, whatsapp optional boolean, language optional string, consent optional boolean), SubmitApplicationRequest (service_slug, tier, personal_info of type PersonalInfo, service_data optional object with string keys and any values), SubmitApplicationResponse (application_id, code, service_name, tier, payment_required boolean), ApplicationSummary (application_id, code, service_name, service_slug, status, tier, submitted_at, payment_status), ApplicationListResponse (applications array of ApplicationSummary), StatusHistoryItem (status, changed_by nullable string, changed_by_role nullable string, note nullable string, created_at), PaymentInfo (method, amount, governmentFee, vatRate, paidAt nullable string, receiptNumber nullable string), ApplicationDetail (application_id, code, service_name, service_slug, tier, status, personal_info record, service_data record, payment_status, payment_amount nullable number, status_display string, payment_info nullable PaymentInfo, sla_deadline nullable string, submitted_at, assigned_agent_id nullable string, status_history array of StatusHistoryItem, documents array of DocumentItem — defined below, messages array of MessageItem — defined below), DashboardSummary (unreadCount, actionCount, activeCount, completedCount, docCount, docSizeMB, avgTurnaround nullable number), TrackerStep (step_number, title, status), TrackerResponse (code, service_name, status, current_step_number nullable number, current_step_title nullable string, estimated_completion nullable string, submitted_at, updated_at).

For documents, add DocumentItem (document_id, application_id, requirement_key, original_filename, mime_type, file_size_bytes, uploaded_by, uploaded_by_role, version, qc_status, qc_notes nullable record, is_active, created_at), DocumentListResponse (documents array of DocumentItem).

For messages, add MessageItem (message_id, sender_id nullable string, sender_role nullable string, content, is_internal boolean, is_system boolean, attachments array of strings, is_read_by_client boolean, read_by_agent_at nullable string, created_at), MessageListResponse (messages array of MessageItem), SendMessageRequest (content string, is_internal optional boolean, attachments optional array of strings).

For agent cases, add AgentCaseSummary (code, service_name, client_name, status, tier, submitted_at, sla_state, sla_deadline nullable string, unread_messages optional number), AgentCaseListResponse (cases array of AgentCaseSummary), UpdateStatusRequest (status string, note optional string, rejection_reason optional string), UnassignedCase (code, service_name, submitted_at, tier, eta_business_days nullable number), UnassignedQueueResponse (count, cases array of UnassignedCase).

For agent settings and metrics, add AgentSettings (accepting_cases, daily_case_cap nullable number, notification_new_case, notification_client_reply, notification_sla_alert, notification_daily_summary), AgentSkill (service_category, proficiency_level number 1-5, notes nullable string), AgentSkillsResponse (agent_id, skills array of AgentSkill), WeeklyBar (week string, count number), LeaderboardEntry (initials, name, count, isMe boolean), AgentMetrics (completedCount, completedDelta string, avgTurnaround number, avgTurnaroundDelta string, onTimeSLAPercent number, clientRating number, ratingsCount number, weeklyBars array of WeeklyBar, leaderboard array of LeaderboardEntry).

For payments, add InitiatePaymentRequest (application_code, method string one of mtn-momo airtel-money card agent, phone_number optional string, card_token optional string, operator optional string), InitiatePaymentResponse (paymentId, transactionId, status, expiresAt nullable string, sessionToken nullable string), PaymentStatusResponse (transactionId, status, paidAt nullable string), PaymentReceiptResponse (serviceName, trackingCode, amount number, governmentFee number, vatAmount number, method string, transactionId, receiptNumber, paidAt string, applicationCode).

For admin analytics, add AdminMetric (id, label, value string or number, delta optional string, deltaDir optional string, deltaColor optional string), ServiceMixBar (service, pct number, color), PaymentMixBar (method, pct number, color), StatusBreakdown (label, count, pct, color), AlertItem (id, message, severity string warn or danger or info, cta optional string, ctaHref optional string), AdminAgentItem (id, fullName, initials, email, skills array of strings, load number, capacity number, twoFa boolean, role string, status string, activeCases number, completedTotal number, avgTurnaround string, slaPercent number, rating number), AnalyticsResponse (metrics array of AdminMetric, weeklyBars array of WeeklyBar, serviceMix array of ServiceMixBar, paymentMix array of PaymentMixBar, statusBreakdown array of StatusBreakdown, alerts array of AlertItem, agents array of AdminAgentItem).

For admin governance, add OversightCase (code, service, agent, client, status, issue nullable string), OversightCaseListResponse (cases array of OversightCase), AuditEntry (id, timestamp, actor, actorType, description, kind), AuditLogResponse (entries array of AuditEntry, total, has_more), BroadcastRecord (id, audience, channels array of strings, message, sentAt, reach number), BroadcastListResponse (broadcasts array of BroadcastRecord), CreateBroadcastRequest (audience_description, audience_filter record, channels array of strings, message, scheduled_at optional string), PlatformSettings (acceptNewApps boolean, guestApps boolean, dataRetention string, compactTables optional boolean, enforce2FA boolean, sessionTimeout number, ipAllowlist string, maintenanceMode boolean).

For the query key registry, add a top-level exported constant called QUERY_KEYS that maps each domain to an array used as the queryKey. For example: QUERY_KEYS.services is the array containing the string "services", QUERY_KEYS.service is a function taking slug and returning the array containing "services" and the slug, QUERY_KEYS.applications returns the array containing "applications", QUERY_KEYS.application is a function taking code, QUERY_KEYS.agentCases returns "agent-cases", QUERY_KEYS.agentCase is a function taking code, QUERY_KEYS.adminAnalytics returns "admin-analytics", and so on for every data type. Using a central registry prevents query key typos from causing cache isolation bugs.


## Section Five: New API Module Files

Create the following files in src/lib/api/. Follow the exact same pattern as auth.ts: import apiClient, define typed async functions, export them. No default exports — only named exports.

Create lib/api/services.ts with these functions: getServices which calls GET /api/services and returns ServiceListResponse, getServiceBySlug which takes a slug string and calls GET /api/services/{slug} returning ServiceDetail, getAdminServices which calls GET /api/admin/services returning ServiceListResponse, getAdminServiceBySlug which calls GET /api/admin/services/{slug} returning ServiceDetail, createService which takes a create payload and calls POST /api/admin/services returning the created service, updateService which takes slug and update payload and calls PATCH /api/admin/services/{slug}, setServiceSteps which takes slug and a steps array and calls POST /api/admin/services/{slug}/steps, setDocumentRequirements which takes slug and requirements array and calls POST /api/admin/services/{slug}/document-requirements, setFormFields which takes slug and fields array and calls POST /api/admin/services/{slug}/form-fields, updatePricingTier which takes slug, tier name, and pricing payload and calls PATCH /api/admin/services/{slug}/pricing/{tier}, updateServiceStatus which takes slug and status string and calls PATCH /api/admin/services/{slug}/status.

Expand lib/api/applications.ts to add alongside the existing functions: submitApplication which takes a SubmitApplicationRequest and calls POST /api/applications/submit returning SubmitApplicationResponse, getApplications which calls GET /api/applications returning ApplicationListResponse, getApplicationSummary which calls GET /api/applications/summary returning DashboardSummary, getApplicationDetail which takes a code string and calls GET /api/applications/{code} returning ApplicationDetail, cancelApplication which takes a code and optional reason and calls POST /api/applications/{code}/cancel, getTrackerInfo which takes a code and calls GET /api/track/{code} returning TrackerResponse, getAdminApplications which takes optional filter params and calls GET /api/admin/applications with query string, getAdminApplicationDetail which takes a code and calls GET /api/admin/applications/{code}, assignApplication which takes a code and agent_id and calls PATCH /api/admin/applications/{code}/assign, updateApplicationStatus which takes a code, status, and optional note and calls PATCH /api/admin/applications/{code}/status for both agent and admin variants.

Create lib/api/documents.ts with: uploadDocument which takes a code string, requirementKey string, and a File object and constructs a FormData with the file appended at key "file" and requirement_key as a string field, then calls POST /api/applications/{code}/documents with the FormData — critically, do not set Content-Type header, pass an optional onUploadProgress callback through to Axios config, and return DocumentItem; listDocuments which takes a code and calls GET /api/applications/{code}/documents returning DocumentListResponse; downloadDocument which takes a document_id and optional inline boolean, sets responseType to blob in the Axios config, calls GET /api/documents/{document_id} with inline as a query param, and returns a Blob; deleteDocument which takes a code and document_id and calls DELETE /api/applications/{code}/documents/{document_id}; updateDocumentQc which takes a case code, document_id, qc_status, and optional qc_notes and calls PATCH /api/agent/cases/{code}/documents/{document_id}/qc for agent use; agentUploadDocument which takes a case code, requirement_key, and File and does the same FormData construction as uploadDocument but against POST /api/agent/cases/{code}/documents.

Create lib/api/messages.ts with: getMessages which takes a code and calls GET /api/applications/{code}/messages returning MessageListResponse for client use; getAgentMessages which takes a code and calls GET /api/agent/cases/{code}/messages; sendMessage which takes a code and SendMessageRequest and calls POST /api/applications/{code}/messages returning MessageItem; sendAgentMessage which takes a code and SendMessageRequest including optional is_internal and calls POST /api/agent/cases/{code}/messages; markMessagesRead which takes a code and calls PATCH /api/applications/{code}/messages/read.

Create lib/api/agent.ts with: getAgentCases which calls GET /api/agent/cases returning AgentCaseListResponse, getAgentCase which takes a code and calls GET /api/agent/cases/{code} returning ApplicationDetail, getUnassignedCases which calls GET /api/agent/cases/unassigned returning UnassignedQueueResponse, claimCase which takes a code and calls POST /api/agent/cases/unassigned/{code}/claim, updateCaseStatus which takes a code and UpdateStatusRequest and calls PATCH /api/agent/cases/{code}/status, getAgentSettings which calls GET /api/agent/settings returning AgentSettings, updateAgentSettings which takes a partial settings object and calls PUT /api/agent/settings, getAgentSkills which calls GET /api/agent/skills returning AgentSkillsResponse, getAgentMetrics which calls GET /api/agent/metrics returning AgentMetrics.

Create lib/api/payments.ts with: initiatePayment which takes an InitiatePaymentRequest and calls POST /api/payments/initiate returning InitiatePaymentResponse, getPaymentStatus which takes a transaction_id and calls GET /api/payments/{transaction_id}/status returning PaymentStatusResponse, getPaymentReceipt which takes an application code and calls GET /api/applications/{code}/payment/receipt returning PaymentReceiptResponse.

Create lib/api/analytics.ts with: getAdminAnalytics which calls GET /api/admin/analytics returning AnalyticsResponse.

Create lib/api/oversight.ts with: getOversightCases which takes an optional tab parameter (all, attention, sla, disputes) and calls GET /api/admin/oversight/cases with tab as a query param, escalateCase which takes a code and reason and calls PATCH /api/admin/oversight/cases/{code}/escalate, resolveCase which takes a code and optional resolution note and calls PATCH /api/admin/oversight/cases/{code}/resolve.

Create lib/api/audit.ts with: getAuditLog which takes optional kind, limit (default 50), and offset (default 0) and calls GET /api/admin/audit-log with those query params returning AuditLogResponse.

Create lib/api/broadcasts.ts with: getBroadcasts which calls GET /api/admin/broadcasts returning BroadcastListResponse, createBroadcast which takes a CreateBroadcastRequest and calls POST /api/admin/broadcasts returning BroadcastRecord.

Create lib/api/platform.ts with: getPlatformSettings which calls GET /api/admin/settings returning PlatformSettings, updatePlatformSettings which takes a partial settings object and calls PATCH /api/admin/settings returning PlatformSettings.

Create lib/api/assignments.ts with: getAdminAgentSkills which takes an agent_id and calls GET /api/admin/agents/{agent_id}/skills returning AgentSkillsResponse, setAdminAgentSkills which takes an agent_id and skills array and calls PATCH /api/admin/agents/{agent_id}/skills, getAdminLeaderboard which calls GET /api/admin/agents/leaderboard.


## Section Six: New Hook Files

Create the following hook files in src/hooks/. Follow the exact pattern of useAdmin.ts: useQuery for reads (with QUERY_KEYS for the queryKey and the API function for queryFn), useMutation for writes (with onSuccess invalidating the relevant query keys). All hooks must be Client Components-compatible (they implicitly work anywhere that is a client component).

Create hooks/useServices.ts with useServices (queries QUERY_KEYS.services, calls getServices), useService taking a slug (queries QUERY_KEYS.service(slug), calls getServiceBySlug(slug), enabled only if slug is provided), useAdminServices (queries QUERY_KEYS.adminServices, calls getAdminServices), useAdminService taking a slug, useCreateService (mutation calling createService, invalidates QUERY_KEYS.adminServices on success), useUpdateService taking slug (mutation calling updateService, invalidates both QUERY_KEYS.adminService(slug) and QUERY_KEYS.adminServices), useSetServiceSteps, useSetDocumentRequirements, useSetFormFields, useUpdatePricingTier, useUpdateServiceStatus.

Create hooks/useApplications.ts with useApplications (queries QUERY_KEYS.applications, calls getApplications), useApplicationSummary (queries QUERY_KEYS.applicationSummary, calls getApplicationSummary), useApplication taking code (queries QUERY_KEYS.application(code), calls getApplicationDetail(code), enabled only when code is provided), useSubmitApplication (mutation calling submitApplication, invalidates QUERY_KEYS.applications and QUERY_KEYS.applicationSummary on success), useCancelApplication taking code (mutation, invalidates QUERY_KEYS.application(code) and QUERY_KEYS.applications), useTrackerLookup taking code (queries QUERY_KEYS.tracker(code), calls getTrackerInfo(code)), useAdminApplications taking optional filters (queries QUERY_KEYS.adminApplications, calls getAdminApplications with filters), useAssignApplication (mutation calling assignApplication, invalidates QUERY_KEYS.adminApplications and the specific application), useUpdateApplicationStatus (mutation for both agent and admin status updates).

Create hooks/useDocuments.ts with useDocuments taking code (queries QUERY_KEYS.documents(code), calls listDocuments(code)), useUploadDocument taking code (mutation that accepts a File and requirement_key, calls uploadDocument with onUploadProgress tracking upload progress via a local state, invalidates QUERY_KEYS.documents(code) on success), useDeleteDocument taking code (mutation calling deleteDocument), useUpdateDocumentQc (agent mutation).

Create hooks/useMessages.ts with useMessages taking code and optional isAgent boolean (queries QUERY_KEYS.messages(code), calls getMessages or getAgentMessages based on isAgent), useSendMessage taking code and optional isAgent (mutation calling sendMessage or sendAgentMessage based on isAgent, uses optimistic update to show the message immediately before the server confirms — add the new message to the cache optimistically in onMutate, confirm or rollback in onSuccess/onError), useMarkMessagesRead taking code (mutation, no cache update needed — the next query fetch will update read status).

Create hooks/useAgentCases.ts with useAgentCases (queries QUERY_KEYS.agentCases, calls getAgentCases), useAgentCase taking code (queries QUERY_KEYS.agentCase(code), calls getAgentCase(code)), useUnassignedCases (queries QUERY_KEYS.unassignedCases, calls getUnassignedCases), useClaimCase (mutation calling claimCase, invalidates QUERY_KEYS.unassignedCases and QUERY_KEYS.agentCases), useUpdateCaseStatus (mutation calling updateCaseStatus, invalidates QUERY_KEYS.agentCase(code) and QUERY_KEYS.agentCases).

Create hooks/useAgentProfile.ts with useAgentSettings (queries QUERY_KEYS.agentSettings, calls getAgentSettings), useUpdateAgentSettings (mutation, invalidates QUERY_KEYS.agentSettings), useAgentSkills (queries QUERY_KEYS.agentSkills, calls getAgentSkills), useAgentMetrics (queries QUERY_KEYS.agentMetrics, calls getAgentMetrics).

Create hooks/usePayment.ts with useInitiatePayment (mutation calling initiatePayment, on success updates the payment context with the transactionId and paymentId), usePaymentStatus taking transactionId and enabled boolean (queries QUERY_KEYS.paymentStatus(transactionId), calls getPaymentStatus, refetchInterval is a function returning 5000 when status is "processing" and false otherwise, enabled only when transactionId is non-empty), usePaymentReceipt taking applicationCode (queries QUERY_KEYS.paymentReceipt(applicationCode), calls getPaymentReceipt, enabled only when applicationCode is non-empty).

Create hooks/useAnalytics.ts with useAdminAnalytics (queries QUERY_KEYS.adminAnalytics, calls getAdminAnalytics, staleTime 2 minutes because analytics data changes often).

Create hooks/useOversight.ts with useOversightCases taking optional tab (queries QUERY_KEYS.oversightCases with tab included in the key, calls getOversightCases(tab)), useEscalateCase (mutation, invalidates QUERY_KEYS.oversightCases), useResolveCase (mutation, invalidates QUERY_KEYS.oversightCases).

Create hooks/useAuditLog.ts with useAuditLog taking optional kind, limit, offset (queries QUERY_KEYS.auditLog with all params in the key, calls getAuditLog).

Create hooks/useBroadcasts.ts with useBroadcasts (queries QUERY_KEYS.broadcasts, calls getBroadcasts), useCreateBroadcast (mutation, invalidates QUERY_KEYS.broadcasts).

Create hooks/usePlatformSettings.ts with usePlatformSettings (queries QUERY_KEYS.platformSettings, calls getPlatformSettings), useUpdatePlatformSettings (mutation, invalidates QUERY_KEYS.platformSettings).


## Section Seven: Delete Mock Data Files and Fix Imports

Before building any pages, you must remove the mock data files and fix all their import sites. This step comes early because leaving these files in place while you build will mask integration problems — pages that appear to work might still be reading from the mock files.

Delete src/lib/services-data.ts entirely. Before deleting, run a search for every file that imports from it. You will find imports in the wizard components (WizStepRouter, WizStep2Service), in the services marketing pages, in the admin services page, and possibly in layout components. In every import site, replace the imported data with the appropriate API hook (useService for single service, useServices for the list). Each import site will need its component to become a Client Component if it is not already.

Delete src/lib/tracker-data.ts entirely. Before deleting, find the generateStaticParams export in src/app/(tracker)/track/[code]/page.tsx that uses MOCK_TRACKER_CODES. Remove the generateStaticParams function entirely — the tracker routes will be dynamic, not statically generated. Also remove the import of getApplicationByCode from tracker-data.ts in any tracker component and replace it with the useTrackerLookup hook.


## Section Eight: Build Phases — Execute in This Order

Phase One: Types, Query Keys, and API Layer

Write all new TypeScript interfaces in src/lib/api/types.ts and the QUERY_KEYS registry as described in Section Four. Then create all new API module files from Section Five. At this stage you are only creating files — no pages or components are changed yet. After creating the API files, verify there are no TypeScript compilation errors by running the type checker. The types must be fully consistent before you proceed.

Acceptance criteria: TypeScript reports zero errors in lib/api/. Every new API function is typed correctly and the QUERY_KEYS registry covers all domains.


Phase Two: Hook Layer

Create all hook files from Section Six. These hooks import from the API files you just created. Run the type checker again after creating each hook file to catch issues early.

Acceptance criteria: TypeScript reports zero errors in hooks/. Every hook file exports at least one hook and the hook is properly typed.


Phase Three: Delete Mock Data Files

Delete services-data.ts and tracker-data.ts. Fix all import errors that result. At this point, some pages and components will fail to compile because they depend on these files. That is expected. You will fix them one by one in the subsequent phases. Do not move to the next phase until all TypeScript errors from the deletion are resolved.

Acceptance criteria: The project compiles without reference to services-data.ts or tracker-data.ts anywhere.


Phase Four: Application Wizard Integration

This is the most critical integration because it is the core client user flow. Fix it in this order.

First, update WizShell and WizStepRouter. The shell currently reads service configuration from services-data.ts to initialize the application context draft. Replace this with a data-fetching component that calls useService(slug) where slug comes from the URL parameter. While the service is loading, show a skeleton. If the service is not found or returns an error, render an appropriate error state. Pass the loaded ServiceDetail object into the wizard so it is available to all steps.

Second, update WizStep2Service. The dynamic form fields currently come from the service config in services-data.ts. They will now come from the serviceDetail.application_config.cards array fetched from the API. The buildStep2Schema function in application-schema.ts should already handle this — verify it handles all field types the backend returns (text, textarea, select, radio_card, date, switch, checkbox). If any field type is missing from the Zod schema builder, add it.

Third, update WizStep3Documents. The document upload slots currently come from the service requirements in services-data.ts. They will now come from serviceDetail.requirements. Replace the simulateUpload function with a real call to uploadDocument(code, requirementKey, file) from lib/api/documents.ts. The onUploadProgress callback from Axios replaces the fake progress simulation — update the progress state with the actual percentage (loaded / total multiplied by 100). Replace the simulated photo quality check (which always triggers a fake warning after 1.5 seconds) with reading the qc_status field from the DocumentItem that the upload endpoint returns. If qc_status is "warn" or "fail", show the quality warning UI with the qc_notes content. At step 3, the application does not exist yet — documents are staged temporarily in the application context draft. When the application is submitted on step 4, the document IDs or file references will be included. Check how the backend expects documents to be submitted: if the backend expects documents to be uploaded after submission using the application code, then step 3 uploads should happen after step 4 submission (upload documents to the newly created application code, then move to step 5). Align the wizard flow accordingly.

Fourth, update WizStep4Review. Remove the simulated submission entirely (the 1800ms delay, the 80% random success, the locally generated PRX code, the localStorage idempotency check). Replace with a real call to useSubmitApplication(). The submission payload assembles personal_info from the draft.personal object, service_data from draft.serviceConfig, service_slug from the URL, and tier from the draft. On success, the response contains the real PRX code and the application_id. Store the PRX code and navigate to step 5. After navigation to step 5, if documents were collected in step 3, upload them one by one to the newly created application using POST /api/applications/{code}/documents. On error, display the error message from the ApiError and allow the user to retry.

Fifth, update WizStep5Confirmation. It currently generates a fake PRX code. Replace with the real PRX code received from the step 4 submission response (store it in the application context on successful submission).

Acceptance criteria: Complete the full wizard flow in the browser from step 1 to step 5 for a real service from the API. Verify the application appears in the database (check GET /api/applications). Verify documents are attached to the application.


Phase Five: Public Services Catalogue Integration

Update src/app/(marketing)/services/page.tsx to fetch the service list via useServices(). Map over the real ServiceSummary objects to render the catalogue grid. The ServiceCard component should receive the service's color, name, category, short_description, and slug. Remove any hardcoded service arrays.

Update src/app/(marketing)/services/[slug]/page.tsx to fetch service detail via useService(slug). Populate the service detail page sections (requirements, steps, pricing tiers, FAQs) from the real data. Note that FAQs are not part of the backend service schema — if the marketing page has an FAQ section, it may need to remain static or you can add a faqs field to the service when the admin creates services via a future enhancement. For now, either show an empty FAQ section or remove that section if no data is available.

Acceptance criteria: Navigate to /services in the browser and see real services from the database. Navigate to /services/passport-renewal and see the real service detail.


Phase Six: Client Dashboard Integration

Update src/app/(dashboard)/dashboard/page.tsx. The page currently shows four stat tiles all with value 0. Replace with data from useApplicationSummary() which returns unreadCount, actionCount, activeCount, completedCount, docCount, and avgTurnaround. Map these to the correct stat tiles. The "Active applications" tile uses activeCount, the "Completed" tile uses completedCount, the "Documents uploaded" tile uses docCount, and the "Avg turnaround" tile uses avgTurnaround formatted as a number of days.

Also add a real applications list using useApplications(). Map over the ApplicationSummary objects to render each application card in the "Active applications" section. Each card should show service_name, code, status_display (use this field for the human-readable status shown to the client), tier, and submitted_at.

Acceptance criteria: Log in as a client who has submitted an application. The dashboard shows non-zero stats and the application appears in the list.


Phase Seven: Application Detail Page Integration

Update src/app/(dashboard)/app/[code]/page.tsx. This page currently has a TODO comment where application data should be fetched. Replace with useApplication(code) where code comes from the route params. The loaded ApplicationDetail object provides all the data shown across the tabs.

For the Overview tab: show the agent info from assigned_agent_id (you may need to add an endpoint or enrich the application detail response later — for now show "Agent assigned" or "Pending assignment" based on whether assigned_agent_id is non-null).

For the Messages tab: use useMessages(code) to load the message thread. The messages from the API include is_system messages (shown as system announcements) and regular agent messages. The existing message UI components expect a certain data shape — map the MessageItem fields to whatever shape those components expect. Use useSendMessage(code) for the message compose area. The optimistic update in useSendMessage should show the client's new message immediately before the server confirms.

For the Documents tab: use useDocuments(code) to load the document list. Each DocumentItem has original_filename, file_size_bytes, mime_type, qc_status, and created_at. The download button should call downloadDocument(document_id, false) and use createObjectURL + a programmatic click to trigger the browser download.

For the History tab: the ApplicationDetail includes status_history array. Map over it to render the timeline.

For the Payment tab: if payment_info is non-null on the application, show the payment details. If payment_info is null and payment_status is "pending", show a link to the payment page. The route to the payment page is /pay/{application_id}/method-choice.

Acceptance criteria: Navigate to /app/PRX-XXXXXX for a real submitted application. All tabs show real data.


Phase Eight: Payment Flow Integration

The payment flow starts when a client clicks "Pay now" from the application detail page. The payment context is initialized with fee data from the backend.

Update the payment context (src/lib/payment-context.tsx). When the context is initialized for a given applicationId, fetch the application detail to get the tier information, then read the pricing tier's platform_fee and government_fee. Replace the hardcoded serviceFee: 0 and governmentFee: 0 defaults with real values from the API response. Store the real fees in the context so all payment pages can read them.

Update src/app/(payment)/pay/[applicationId]/method-choice/page.tsx. Verify the payment context is populated with real fees. Ensure the selected method is stored in context and the user is routed to the correct next page.

Update src/app/(payment)/pay/[applicationId]/card/page.tsx. When the card form is submitted, call useInitiatePayment with method "card" and the card_token (in development with the stub gateway, you can use any non-empty string as the card_token). Store the transactionId from the response in the payment context. For the 3DS frame, in development mode simply show a "Processing payment..." message and poll usePaymentStatus. The stub gateway will mark the payment as paid within 3 seconds. Navigate to the receipt page when status becomes "paid".

Update src/app/(payment)/pay/[applicationId]/mobile-money/page.tsx. Submit the form using useInitiatePayment with method "mtn-momo" or "airtel-money" and the phone_number. Store the transactionId in context. Start polling usePaymentStatus with refetchInterval 5000 while status is "processing". The countdown timer in the UI should be driven by the expires_at timestamp from the InitiatePaymentResponse (compute seconds remaining from now to expires_at). Navigate to /pay/{applicationId}/receipt when status becomes "paid". Navigate to /pay/{applicationId}/timeout when status becomes "timed_out".

Update src/app/(payment)/pay/[applicationId]/receipt/page.tsx. Fetch real receipt data using usePaymentReceipt(applicationId). Map the PaymentReceiptResponse fields to the receipt UI components. The vatAmount field is already computed by the backend. The method field is a human-readable string like "MTN Mobile Money". Remove the localStorage-based receipt persistence and use the API response directly.

Acceptance criteria: Go through the full payment flow as a client — initiate payment for a submitted application, complete the mobile money or card flow, and see the real receipt with a receipt number.


Phase Nine: Public Tracker Integration

Update src/app/(tracker)/track/[code]/page.tsx. Remove the import of getApplicationByCode from tracker-data.ts (already deleted in Phase Three). The page should use the useTrackerLookup(code) hook to fetch real tracker data from GET /api/track/{code}. The TrackerResponse includes code, service_name, status, current_step_number, current_step_title, estimated_completion, submitted_at, and updated_at.

Remove the generateStaticParams function entirely from the tracker route — the page is now fully dynamic.

Map the TrackerResponse to the tracker UI. The status field from the backend uses the internal status values (received, under_review, in_progress, etc.). The status_display field is not available on the tracker endpoint (it's a public unauthenticated endpoint that returns limited data). Map the internal status to a display label in the frontend: use a local mapping function that converts backend status strings to the tracker UI's status labels.

Update the tracker code entry form at src/app/(tracker)/track/page.tsx. When a code is submitted, navigate to /track/{code}. The useTrackerLookup hook handles the actual fetch on the detail page.

Acceptance criteria: Navigate to /track, enter a real PRX code for a submitted application, and see real status, step, and timeline data.


Phase Ten: Agent Workspace Integration

The agent workspace currently shows empty state because agent-context.tsx is populated with EMPTY_AGENT_USER and an empty cases array. The fix is to stop storing cases in context (context is for UI state, not server state) and instead use hooks directly in the components that need the data.

Update src/app/(agent)/agent/page.tsx. Replace the useAgentState() cases data with useAgentCases(). The case list, stat tiles, and "needs you today" section all read from the cases array. With real data, the stat tiles compute from the cases statuses. The user's name in the greeting comes from useSession().

Update src/app/(agent)/agent/case/[code]/page.tsx. Use useAgentCase(code) for case detail. Use useMessages(code, true) for the conversation thread (isAgent: true returns all messages including internal notes). Use useDocuments(code) for the documents tab. Use useUpdateCaseStatus for the status transition controls. The QC checklist tab reads from the documents' qc_status and qc_notes fields. The history tab reads from the ApplicationDetail's status_history array.

Update src/app/(agent)/agent/settings/page.tsx. Use useAgentSettings() and useUpdateAgentSettings(). The form controls (accepting cases toggle, daily cap input, notification preferences) map directly to the AgentSettings fields.

Update src/app/(agent)/agent/performance/page.tsx. Use useAgentMetrics() to populate all the performance metrics. The weeklyBars array drives the bar chart. The leaderboard array drives the leaderboard table.

Acceptance criteria: Log in as an agent. The case queue shows real assigned cases. Open a case and see real client info, messages, and documents. Update a case status and confirm the change persists.


Phase Eleven: Admin Analytics Integration

Update src/app/(admin)/admin/analytics/page.tsx. The admin context currently initializes with empty arrays and a fake 1200ms loading delay. Replace the analytics data loading with useAdminAnalytics(). When the query is loading, show the skeleton UI. When the data is available, render all seven sections.

The metrics array drives the six KPI cards. Each AdminMetric has id, label, value, delta, deltaDir, and deltaColor — map these directly to the stat tile component props.

The weeklyBars array drives the weekly volume bar chart. Each WeeklyBar has week (a formatted date string like "Jun 09") and count.

The serviceMix array drives the service distribution chart. Each ServiceMixBar has service name, pct, and color.

The paymentMix array drives the payment method chart. Each PaymentMixBar has method, pct, and color.

The statusBreakdown array drives the application status distribution.

The alerts array renders dynamically — if empty, the alerts section is hidden. Each AlertItem has severity (warn, danger, info), message, and optional cta with ctaHref.

The agents array drives the agent performance table. Each AdminAgentItem has all the columns the table needs: fullName, activeCases, completedTotal, avgTurnaround string, slaPercent, load, capacity, twoFa, status.

Acceptance criteria: Log in as admin and view the analytics page. All seven sections render with real computed data.


Phase Twelve: Admin Services Schema Builder Integration

Update src/app/(admin)/admin/services/page.tsx. The page currently renders the ServicesSchemaBuilder component with data from context. Replace with useAdminServices() for the service list and useAdminService(selectedSlug) for the selected service's full detail including form fields and document requirements.

When the admin saves changes to form fields, call useSetFormFields(). When they save document requirements, call useSetDocumentRequirements(). When they update service status (publish/pause/archive), call useUpdateServiceStatus(). When they update pricing, call useUpdatePricingTier(). The schema builder UI already exists — you are wiring the save buttons to real mutations.

For creating a new service, the admin fills in a form and calls useCreateService(). On success, navigate to the new service's slug in the builder.

Acceptance criteria: Log in as admin. Create a new service with form fields and document requirements. Publish it. Navigate to the public /services page and confirm the new service appears.


Phase Thirteen: Admin Oversight, Audit, Broadcasts, and Platform Settings

Update src/app/(admin)/admin/oversight/page.tsx. Use useOversightCases(activeTab) where activeTab is the currently selected tab (all, attention, sla, disputes). The OversightCase objects map directly to the oversight table columns (code, service, agent, client, status, issue). Wire the "Escalate" button to useEscalateCase() and the "Resolve" button to useResolveCase().

Update src/app/(admin)/admin/oversight/page.tsx for the audit log section. Use useAuditLog(kind, limit, offset) where kind comes from the active filter tab. Map AuditEntry objects to the audit table rows (timestamp, actor, actorType, description, kind).

Update src/app/(admin)/admin/broadcasts/page.tsx. Use useBroadcasts() for the list of past broadcasts. Use useCreateBroadcast() for the compose form. The broadcast form collects audience_description, audience_filter (build a structured filter object from the UI selections), channels (array of selected channel strings), message text, and optional scheduled_at.

Add platform settings to the admin settings section (it may be on the analytics page or a separate settings page). Use usePlatformSettings() to load the current settings and useUpdatePlatformSettings() for the save action. Map each AdminSettings field to the corresponding toggle or input in the settings form.

Acceptance criteria: Log in as admin. The oversight board shows real SLA breach and escalation data. The audit log shows real entries for assignments and payments. Creating a broadcast creates a real database record.


Phase Fourteen: Admin Agent Skills Integration

The admin agents page already has the create, list, and update agent functionality. Add skills management. When an agent row is expanded or a "View skills" button is clicked, use useAdminAgentSkills(agentId) to load that agent's skill profile. Render the skills as a list of category + proficiency level pairs. Provide an edit mode where the admin can adjust proficiency levels for each service category. On save, call useSetAdminAgentSkills(agentId, skills).

Acceptance criteria: Log in as admin. Open an agent's skill profile. Set their identity category proficiency to level 4. Confirm the change persists by reloading.


Phase Fifteen: Context Simplification and Final Wiring

After all feature pages are wired to real API data, simplify the context files that were bloated with mock state.

Simplify agent-context.tsx by removing the EMPTY_AGENT_USER constant, the DEFAULT_AGENT_SETTINGS constant, and the cases array. The context should retain only UI state that genuinely belongs there: the current active tab, the command palette open/close state, the dark mode preference (still localStorage), the offline status (still navigator.onLine), the confirm modal state, and the SLA breach count (which can be derived from the analytics query). Agent data (profile, cases, settings, metrics) now lives in React Query cache and is accessed via hooks.

Simplify admin-context.tsx similarly. Remove all the data arrays (agents, metrics, weeklyBars, serviceMix, paymentMix, statusBreakdown, alerts, services, pricingRows, auditLog, oversightCases, broadcasts). Remove the fake 1200ms loading timeout. The context should retain only UI state: the active schema service ID for the builder, the dark mode preference, the confirm modal state, the permission dialog state, the broadcast confirm state, the schema publish open flag, and the oversight tab selection. All real data lives in React Query.

Update payment-context.tsx to remove the hardcoded zero-fee defaults. The fees are populated when the payment flow begins from the application detail.

Acceptance criteria: Remove the mock constants from both contexts. The application compiles and all pages continue to work using hooks for data and contexts for UI state only.


## Section Nine: Critical Rules for This Integration

Never import directly from a deleted file. If you delete services-data.ts and something still imports from it, that is a compilation error that must be fixed before committing.

Never put API calls in Server Components. Page files in the App Router should remain Server Components. If a page needs data from the API, extract the data-dependent content into a "use client" component that uses the appropriate hook.

Never bypass React Query for API calls. Every API call that populates UI must go through a useQuery or useMutation hook. Direct calls to API functions from components or pages are only acceptable for one-shot user-triggered actions that do not need caching.

Never set Content-Type manually for file uploads. FormData + Axios handles the multipart boundary automatically. Manually setting Content-Type to multipart/form-data without the boundary will corrupt the upload.

Never expose internal status strings to the client-facing UI directly. Use the status_display field from ApplicationDetailResponse which the backend computes. For the tracker and agent views, map the internal status to human-readable labels using a client-side mapping function.

Never change the existing auth integration. The auth module, auth hooks, session hook, and auth middleware are working correctly. Do not modify them.

Always revoke object URLs after use. When you create blob URLs for document downloads or previews using URL.createObjectURL(), always call URL.revokeObjectURL() to prevent memory leaks. Do this in a cleanup function or after the download link is clicked.

Handle loading and error states for every query. Every page section that depends on a useQuery result must have a loading state (skeleton or spinner) and an error state (error message with retry option). Never render a loading section as empty or skip the loading state entirely.


## Section Ten: Verification Checklist

When all fifteen phases are complete, perform these end-to-end verification flows.

Complete client flow: Register a new client account. Verify the OTP. Browse the services catalogue and see real services. Apply for a service through all five wizard steps. Submit the application and receive a real PRX code. Navigate to the payment page and initiate a mobile money payment. Wait for the stub payment to confirm. View the receipt. Open the dashboard and see the application in the active list. Open the application detail page and see all tabs populated with real data.

Complete agent flow: Log in as the agent who was auto-assigned the above application. See the case in the queue with the client's name and service. Open the case detail and read the client's personal info and service responses. Send a message to the client and confirm it appears in the client's application detail. Update the status to in_progress. Mark a document as QC reviewed. View the performance metrics page.

Complete admin flow: Log in as admin. View the analytics dashboard and confirm metrics are non-zero. View the services list and see real services. Edit a service's form fields. View the oversight board. View the audit log and confirm the assignment and status change from the above flows appear. Send a test broadcast. View and update platform settings.

Complete tracker flow: Navigate to /track without logging in. Enter the real PRX code from the client flow above. Confirm the status, service name, and step information display correctly.

If any step in the verification fails, investigate and fix before considering the integration complete.


## Section Eleven: This Integration Closes the Loop

When this integration is complete, every frontend page communicates exclusively with the real backend. The visual design does not change — components, layouts, animations, and color tokens remain exactly as designed. What changes is the data source: mock files and simulated operations are replaced by live API calls that connect to the PostgreSQL database through the FastAPI layer.

The only intentional limitations that remain after this integration are: real payment gateway processing (the stub simulates payments in development, a real gateway integration requires a third-party provider account), real-time push notifications (the current polling approach is sufficient for the initial launch, WebSocket support can be added as an enhancement), and client ratings (hardcoded to 4.5 in the agent metrics, a ratings module can be added later).
