import * as React from "react";
import { cn } from "@/lib/utils";

type FieldType = "input" | "textarea" | "select";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  name: string;
  type?: FieldType;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  error?: string;
  help?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  children?: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      label,
      name,
      type = "input",
      inputType = "text",
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      error,
      help,
      required,
      disabled,
      rows = 4,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const fieldId = `${id}-${name}`;
    const helpId = help ? `${fieldId}-help` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

    const sharedInputClass = cn(
      "w-full rounded-[var(--r-md)] border bg-[var(--paper)] text-[var(--ink)]",
      "font-sans text-[14px] placeholder:text-[var(--ink-subtle)]",
      "px-3 py-2.5 transition-colors duration-[120ms]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-1",
      error
        ? "border-[var(--danger)] focus-visible:ring-[var(--danger)]"
        : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]",
      disabled && "opacity-50 cursor-not-allowed"
    );

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        <label
          htmlFor={fieldId}
          className="font-sans text-[13px] font-medium text-[var(--ink)] leading-none"
        >
          {label}
          {required && <span className="text-[var(--danger)] ml-0.5">*</span>}
        </label>

        {type === "textarea" ? (
          <textarea
            id={fieldId}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(sharedInputClass, "resize-y min-h-[96px]")}
          />
        ) : type === "select" ? (
          <select
            id={fieldId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLSelectElement>}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(sharedInputClass, "appearance-none cursor-pointer")}
          >
            {children}
          </select>
        ) : (
          <input
            id={fieldId}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={sharedInputClass}
          />
        )}

        {help && !error && (
          <p id={helpId} className="t-caption text-[var(--ink-muted)]">
            {help}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="t-caption text-[var(--danger)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";
