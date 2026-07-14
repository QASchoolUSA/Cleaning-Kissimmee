import Link from "next/link";

const variants = {
  primary:
    "bg-fresh text-white hover:bg-fresh-deep shadow-[0_10px_30px_rgba(15,138,125,0.28)]",
  secondary:
    "bg-white text-ink border border-line hover:border-fresh hover:text-fresh-deep",
  ghost: "bg-transparent text-white border border-white/40 hover:bg-white/10",
  dark: "bg-ink text-white hover:bg-ink-soft",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
