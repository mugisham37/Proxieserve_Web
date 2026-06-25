"use client";

import * as React from "react";

// global-error replaces the root layout — must include <html> and <body>.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  React.useEffect(() => {
    console.error("[Hebuza] Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#F8FAFF",
          color: "#1a1612",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 400 }}>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 80,
              margin: "0 0 16px",
              lineHeight: 1,
              fontStyle: "italic",
              color: "#1a1612",
            }}
            aria-hidden="true"
          >
            500
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: 14, color: "#6b6056", lineHeight: 1.6, margin: "0 0 24px" }}>
            Your data is safe. Try refreshing the page.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={unstable_retry}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #2563EB",
                background: "#2563EB",
                color: "#FFFFFF",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 15,
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #1a1612",
                background: "transparent",
                color: "#1a1612",
                textDecoration: "none",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 15,
              }}
            >
              Go home
            </a>
          </div>
          {error.digest && (
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#94A3B8", marginTop: 20 }}>
              Incident #{error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
