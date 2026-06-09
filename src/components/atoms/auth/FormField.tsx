import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type FieldType = "input" | "textarea" | "select";

interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onBlur"> {
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
  helpDetail?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  charCount?: boolean;
  mono?: boolean;
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
      helpDetail,
      required,
      disabled,
      rows = 4,
      maxLength,
      charCount,
      mono,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const fieldId = `${id}-${name}`;
    const helpId = help || helpDetail ? `${fieldId}-help` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const popoverId = helpDetail ? `${fieldId}-popover` : undefined;
    const describedBy = [helpId, errorId, popoverId].filter(Boolean).join(" ") || undefined;
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const charLen = typeof value === "string" ? value.length : 0;

    const sharedInputClass = cn(
      "w-full rounded-[var(--r-md)] border bg-[var(--paper)] text-[var(--ink)]",
      "text-[14px] placeholder:text-[var(--ink-subtle)]",
      mono ? "font-mono" : "font-sans",
      "px-3 py-2.5 transition-colors duration-[120ms]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-1",
      error
        ? "border-[var(--danger)] focus-visible:ring-[var(--danger)]"
        : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]",
      disabled && "opacity-50 cursor-not-allowed"
    );

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        <div className="flex items-center gap-1.5">
          <label
            htmlFor={fieldId}
            className="font-sans text-[13px] font-medium text-[var(--ink)] leading-none"
          >
            {label}
            {required && <span className="text-[var(--danger)] ml-0.5">*</span>}
          </label>
          {helpDetail && (
            <button
              type="button"
              aria-label={`Help: ${label}`}
              aria-expanded={popoverOpen}
              aria-controls={popoverId}
              onClick={() => setPopoverOpen((o) => !o)}
              className="w-[18px] h-[18px] rounded-full bg-[var(--ink)] text-[var(--paper)] font-sans text-[10px] font-bold flex items-center justify-center shrink-0 hover:bg-[var(--ink-2)] transition-colors"
            >
              ?
            </button>
          )}
        </div>

        <AnimatePresence>
          {helpDetail && popoverOpen && (
            <motion.div
              id={popoverId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <p className="font-sans text-[12.5px] text-[var(--info)] bg-[var(--info-soft)] border-l-[3px] border-[var(--info)] rounded-r-[var(--r-sm)] px-3 py-2.5 leading-relaxed">
                {helpDetail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
            maxLength={maxLength}
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
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={sharedInputClass}
          />
        )}

        <div className="flex items-start justify-between gap-2">
          <div>
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
          {charCount && maxLength && (
            <span className="font-mono text-[11px] text-[var(--ink-subtle)] shrink-0 tabular-nums">
              {charLen} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
FormField.displayName = "FormField";
