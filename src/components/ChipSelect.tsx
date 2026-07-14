"use client";

type ChipOption = {
  value: string;
  label: string;
  hint?: string;
};

export function ChipSelect({
  label,
  options,
  value,
  onChange,
  columns = 3,
}: {
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
        ? "grid-cols-4"
        : "grid-cols-3";

  return (
    <fieldset>
      <legend className="label-field mb-2">{label}</legend>
      <div className={`grid ${colClass} gap-2`} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`min-h-12 rounded-xl border px-2 py-2.5 text-center transition active:scale-[0.98] sm:px-3 ${
                selected
                  ? "border-fresh bg-fresh-mist text-fresh-deep shadow-[inset_0_0_0_1px_rgba(15,138,125,0.35)]"
                  : "border-line bg-white text-ink-soft"
              }`}
            >
              <span className="block text-[0.8rem] font-semibold leading-tight sm:text-sm">
                {option.label}
              </span>
              {option.hint ? (
                <span className="mt-0.5 block text-[0.65rem] font-medium text-muted">
                  {option.hint}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
