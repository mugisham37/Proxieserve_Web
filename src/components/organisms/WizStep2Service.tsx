"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import type { Service, AppField, AppCard } from "@/lib/services-data";
import { useApplication } from "@/lib/application-context";
import { buildStep2Schema } from "@/lib/application-schema";
import { WizCard } from "@/components/molecules/WizCard";
import { WizFooter } from "@/components/molecules/WizFooter";
import { WizJumpNav } from "@/components/molecules/WizJumpNav";
import { WizValidationBanner } from "@/components/molecules/WizValidationBanner";
import { ConditionalField } from "@/components/molecules/ConditionalField";
import { FormField } from "@/components/atoms/FormField";
import { RadioCard } from "@/components/atoms/RadioCard";
import { Switch } from "@/components/atoms/Switch";

interface WizStep2ServiceProps {
  service: Service;
}

function isFieldVisible(field: AppField, watchValues: Record<string, unknown>): boolean {
  if (!field.conditional) return true;
  const { field: depField, values } = field.conditional;
  return values.includes(watchValues[depField] as string);
}

function FieldRenderer({
  field,
  control,
  register,
  watch,
  errors,
  onPatch,
}: {
  field: AppField;
  control: ReturnType<typeof useForm>["control"];
  register: ReturnType<typeof useForm>["register"];
  watch: ReturnType<typeof useForm>["watch"];
  errors: Record<string, { message?: string }>;
  onPatch: (key: string, val: unknown) => void;
}) {
  const watchValues = watch() as Record<string, unknown>;
  const visible = isFieldVisible(field, watchValues);
  const errorMsg = errors[field.id]?.message;

  const inner = (() => {
    switch (field.type) {
      case "text":
      case "date":
        return (
          <FormField
            id={field.id}
            label={field.label}
            inputType={field.type === "date" ? "date" : "text"}
            required={field.required}
            placeholder={field.placeholder}
            help={field.help}
            helpDetail={field.helpDetail}
            mono={field.mono}
            error={errorMsg}
            {...register(field.id, {
              onChange: (e) => onPatch(field.id, e.target.value),
            })}
          />
        );

      case "textarea":
        return (
          <FormField
            id={field.id}
            label={field.label}
            type="textarea"
            required={field.required}
            placeholder={field.placeholder}
            help={field.help}
            rows={field.rows ?? 4}
            maxLength={field.maxLength}
            charCount={field.charCount}
            error={errorMsg}
            {...register(field.id, {
              onChange: (e) => onPatch(field.id, e.target.value),
            })}
          />
        );

      case "select":
        return (
          <FormField
            id={field.id}
            label={field.label}
            type="select"
            required={field.required}
            error={errorMsg}
            {...register(field.id, {
              onChange: (e) => onPatch(field.id, e.target.value),
            })}
          >
            <option value="">Select…</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormField>
        );

      case "radio-card":
        return (
          <div role="radiogroup" aria-label={field.label} className="flex flex-col gap-2">
            <label className="font-sans text-[13px] font-medium text-[var(--ink)]">
              {field.label}
              {field.required && <span className="text-[var(--danger)] ml-0.5">*</span>}
            </label>
            <Controller
              name={field.id}
              control={control}
              render={({ field: f }) => (
                <>
                  {field.options?.map((opt) => (
                    <RadioCard
                      key={opt.value}
                      name={field.id}
                      value={opt.value}
                      label={opt.label}
                      description={opt.description}
                      checked={f.value === opt.value}
                      onChange={(v) => {
                        f.onChange(v);
                        onPatch(field.id, v);
                      }}
                    />
                  ))}
                </>
              )}
            />
            {errorMsg && <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">{errorMsg}</p>}
          </div>
        );

      case "switch":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: f }) => (
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
                    {field.label}
                  </span>
                  {field.help && (
                    <span className="font-sans text-[12px] text-[var(--ink-muted)]">{field.help}</span>
                  )}
                </div>
                <Switch
                  checked={!!f.value}
                  onChange={(v) => {
                    f.onChange(v);
                    onPatch(field.id, v);
                  }}
                  label={field.label}
                  name={field.id}
                />
              </div>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: f }) => (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`${field.id}-chk`}
                  checked={!!f.value}
                  onChange={(e) => {
                    f.onChange(e.target.checked);
                    onPatch(field.id, e.target.checked);
                  }}
                  className="mt-0.5 w-4 h-4 rounded accent-[var(--ink)] shrink-0 cursor-pointer"
                />
                <label htmlFor={`${field.id}-chk`} className="font-sans text-[13px] text-[var(--ink)] cursor-pointer">
                  {field.label}
                </label>
              </div>
            )}
          />
        );

      default:
        return null;
    }
  })();

  if (field.conditional) {
    return (
      <ConditionalField visible={visible}>
        {inner}
      </ConditionalField>
    );
  }

  return <>{inner}</>;
}

function CardGroup({ card, control, register, watch, errors, onPatch }: {
  card: AppCard;
  control: ReturnType<typeof useForm>["control"];
  register: ReturnType<typeof useForm>["register"];
  watch: ReturnType<typeof useForm>["watch"];
  errors: Record<string, { message?: string }>;
  onPatch: (key: string, val: unknown) => void;
}) {
  return (
    <WizCard id={card.id} title={card.title} fieldCount={card.fields.length}>
      <div className="flex flex-col gap-4">
        {card.fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            control={control}
            register={register}
            watch={watch}
            errors={errors}
            onPatch={onPatch}
          />
        ))}
      </div>
    </WizCard>
  );
}

export function WizStep2Service({ service }: WizStep2ServiceProps) {
  const router = useRouter();
  const { draft, dispatch, setUiState } = useApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const allFields = service.applicationConfig.cards.flatMap((c) => c.fields);
  const schema = React.useMemo(() => buildStep2Schema(allFields), [allFields]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: draft.serviceConfig,
  });

  const jumpNavItems = service.applicationConfig.cards.map((c) => ({
    id: c.id,
    label: c.title,
  }));

  // Focus heading on mount
  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const patchField = (key: string, val: unknown) => {
    dispatch({
      type: "PATCH_SERVICE_CONFIG",
      payload: { [key]: val as string | boolean | string[] },
    });
  };

  const onValid = (data: Record<string, unknown>) => {
    dispatch({
      type: "PATCH_SERVICE_CONFIG",
      payload: data as Record<string, string | boolean | string[]>,
    });
    dispatch({ type: "SET_HIGHEST_STEP", payload: 2 });
    setUiState((s) => ({ ...s, showValidationBanner: false, validationErrors: {} }));
    router.push(`/services/${service.slug}/apply/3`);
  };

  const onInvalid = () => {
    const errs: Record<string, string> = {};
    Object.entries(errors).forEach(([k, v]) => {
      if (v?.message) errs[k] = v.message;
    });
    setUiState((s) => ({ ...s, showValidationBanner: true, validationErrors: errs }));
  };

  const hasErrors = Object.keys(errors).length > 0;
  const validationErrors = Object.fromEntries(
    Object.entries(errors).map(([k, v]) => [k, (v as { message?: string })?.message ?? ""])
  );

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
      <div className="flex flex-col gap-2 mb-8">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-[clamp(24px,3.5vw,36px)] font-medium italic text-[var(--ink)] outline-none"
        >
          {service.applicationConfig.step2Title}
        </h1>
        {service.applicationConfig.step2Lede && (
          <p className="font-sans text-[14px] text-[var(--ink-muted)]">
            {service.applicationConfig.step2Lede}
          </p>
        )}
      </div>

      {hasErrors && (
        <WizValidationBanner errors={validationErrors} className="mb-6" />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-8 items-start">
        <div className="flex flex-col gap-5">
          {service.applicationConfig.cards.map((card) => (
            <CardGroup
              key={card.id}
              card={card}
              control={control}
              register={register}
              watch={watch}
              errors={errors as Record<string, { message?: string }>}
              onPatch={patchField}
            />
          ))}
        </div>

        {/* Jump nav — desktop only */}
        {jumpNavItems.length > 1 && (
          <WizJumpNav items={jumpNavItems} />
        )}
      </div>

      <WizFooter
        step={2}
        serviceSlug={service.slug}
        onNext={() => handleSubmit(onValid, onInvalid)()}
      />
    </form>
  );
}
