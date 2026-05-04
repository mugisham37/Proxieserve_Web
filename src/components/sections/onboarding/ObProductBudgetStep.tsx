"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { ObBudgetCard } from "@/src/components/molecules/ObBudgetCard";
import { ObTagInput } from "@/src/components/molecules/ObTagInput";
import { productBudgetSchema, type ProductBudgetInput } from "@/src/lib/onboarding/schemas";

const CURRENCY_RATES: Record<string, number> = {
  "US$": 1,
  RWF: 1350,
  KES: 153,
  EUR: 0.92,
};

function formatAmount(value: number, currency: string): string {
  const converted = value * CURRENCY_RATES[currency];
  const isWhole = ["RWF", "KES"].includes(currency);
  return (
    currency +
    " " +
    (isWhole
      ? Math.round(converted).toLocaleString()
      : converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  );
}

interface ObProductBudgetStepProps {
  defaultValues?: Partial<ProductBudgetInput>;
  onDataChange: (data: ProductBudgetInput) => void;
}

export function ObProductBudgetStep({ defaultValues, onDataChange }: ObProductBudgetStepProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductBudgetInput>({
    resolver: zodResolver(productBudgetSchema),
    defaultValues: {
      productName: "Ankara Print Tee — Indigo",
      description:
        "Hand-cut Ankara wax-print t-shirt in indigo colourway. 100% cotton. Sizes XS–3XL. Made in Kigali.",
      price: "35.00",
      productUrl: "https://inema.rw/products/ankara-tee-indigo",
      idealCustomer:
        "Women 25-45 in East Africa interested in artisan fashion, handmade goods, and African print clothing. Also diaspora communities in Europe and North America.",
      currency: "US$",
      dailyCap: 500,
      totalCap: 5000,
      ...defaultValues,
    },
  });

  const watched = watch();

  const watchedStr = JSON.stringify(watched);
  useEffect(() => {
    onDataChange(watched as ProductBudgetInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedStr]);

  const currency = watched.currency || "US$";
  const dailyCap = watched.dailyCap || 500;
  const totalCap = watched.totalCap || 5000;
  const fmt = (v: number) => formatAmount(v, currency);

  const inputClass =
    "w-full py-[10px] px-3 text-[14px] font-[inherit] bg-[var(--bg)] text-[var(--text)] border rounded-[10px] outline-none transition-all duration-[120ms] focus:border-[var(--brand)] placeholder:text-[var(--text-subtle)]";
  const inputStyle = (hasError: boolean) => ({
    borderColor: hasError ? "var(--danger)" : "var(--border)",
    boxShadow: "none",
  });

  return (
    <div>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        Product, audience &amp; budget
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-7">
        Tell SolAI what you&apos;re selling and how much you want to spend.
      </p>

      {/* Product section */}
      <div className="mb-6">
        <h3
          className="text-[11px] font-medium text-[var(--brand)] uppercase tracking-[0.08em] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Product
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[var(--text)]">Product name</label>
            <input
              {...register("productName")}
              type="text"
              placeholder="Ankara Print Tee — Indigo"
              className={inputClass}
              style={inputStyle(!!errors.productName)}
            />
            {errors.productName && (
              <p className="text-[12px] text-[var(--danger)]">{errors.productName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[var(--text)]">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Describe your product..."
              className={`${inputClass} resize-y min-h-[72px]`}
              style={inputStyle(!!errors.description)}
            />
            {errors.description && (
              <p className="text-[12px] text-[var(--danger)]">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[var(--text)]">Price</label>
              <div className="flex gap-0">
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="py-[10px] px-3 text-[13px] bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] border-r-0 rounded-l-[10px] cursor-pointer outline-none"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {Object.keys(CURRENCY_RATES).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  )}
                />
                <input
                  {...register("price")}
                  type="text"
                  placeholder="35.00"
                  className={`${inputClass} rounded-l-none border-l-0 flex-1`}
                  style={{ ...inputStyle(!!errors.price), fontFamily: "var(--font-mono)" }}
                />
              </div>
              {errors.price && (
                <p className="text-[12px] text-[var(--danger)]">{errors.price.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[var(--text)]">Product URL</label>
              <input
                {...register("productUrl")}
                type="url"
                placeholder="https://yourstore.com/product"
                className={inputClass}
                style={inputStyle(!!errors.productUrl)}
              />
              {errors.productUrl && (
                <p className="text-[12px] text-[var(--danger)]">{errors.productUrl.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[var(--text)]">Product images</label>
            <div className="border-2 border-dashed border-[var(--border)] rounded-[14px] p-8 text-center text-[var(--text-subtle)] cursor-pointer transition-colors duration-[120ms] hover:border-[var(--brand)]">
              <div className="flex justify-center mb-2 text-[var(--text-subtle)]">
                <MkIcon name="upload" size={24} />
              </div>
              <p className="text-[14px] m-0">
                Drag images here or{" "}
                <button type="button" className="text-[var(--brand)] bg-none border-none text-[14px] font-[inherit] cursor-pointer underline">
                  browse
                </button>
              </p>
              <span className="text-[12px] block mt-1">
                Recommended: 3–5 images, 1080×1080px minimum
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience section */}
      <div className="mb-6">
        <h3
          className="text-[11px] font-medium text-[var(--brand)] uppercase tracking-[0.08em] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Target Audience
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[var(--text)]">
              Describe your ideal customer
            </label>
            <textarea
              {...register("idealCustomer")}
              rows={3}
              placeholder="Who buys your product? Age, interests, location..."
              className={`${inputClass} resize-y min-h-[72px]`}
              style={inputStyle(!!errors.idealCustomer)}
            />
            {errors.idealCustomer && (
              <p className="text-[12px] text-[var(--danger)]">{errors.idealCustomer.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[var(--text)]">Primary regions</label>
              <ObTagInput
                tags={["Rwanda", "Kenya", "South Africa", "EU (diaspora)"]}
                onRemove={() => {}}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[var(--text)]">Languages</label>
              <ObTagInput
                tags={["English", "French", "Kinyarwanda"]}
                onRemove={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Budget section */}
      <div className="mb-2">
        <h3
          className="text-[11px] font-medium text-[var(--brand)] uppercase tracking-[0.08em] mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Budget
        </h3>
        <p className="text-[13px] text-[var(--text-subtle)] mb-4">
          Hard caps — SolAI will never spend beyond these limits.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Controller
            name="dailyCap"
            control={control}
            render={({ field }) => (
              <ObBudgetCard
                label="Daily spend cap"
                value={field.value}
                min={10}
                max={2000}
                step={10}
                onChange={field.onChange}
                formatValue={(v) => fmt(v)}
              />
            )}
          />
          <Controller
            name="totalCap"
            control={control}
            render={({ field }) => (
              <ObBudgetCard
                label="Total campaign cap"
                value={field.value}
                min={100}
                max={50000}
                step={100}
                onChange={field.onChange}
                formatValue={(v) => fmt(v)}
              />
            )}
          />
        </div>

        <div className="flex gap-3 p-[14px] px-4 bg-[var(--surface)] border border-[var(--border)] rounded-[10px]">
          <span className="text-[var(--brand)] flex-shrink-0 mt-[2px]">
            <MkIcon name="shield" size={16} />
          </span>
          <div>
            <strong className="block text-[14px] text-[var(--text)] mb-1">
              At {fmt(dailyCap)}/day, your budget runs for {Math.ceil(totalCap / dailyCap)} days.
            </strong>
            <p className="text-[13px] text-[var(--text-muted)] m-0">
              SolAI enforces hard limits at Swarm, Agent, and Task levels. The circuit breaker trips
              if per-minute spend exceeds 3× your baseline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
