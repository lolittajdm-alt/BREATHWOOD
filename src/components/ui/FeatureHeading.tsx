type FeatureHeadingProps = {
  line1: string;
  line2: string;
  className?: string;
  /** label = блок «Основні переваги»; feature = пункти списку */
  variant?: "label" | "feature";
};

export function FeatureHeading({
  line1,
  line2,
  className = "",
  variant = "feature",
}: FeatureHeadingProps) {
  const variantClass =
    variant === "label"
      ? "text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm"
      : "text-base font-bold sm:text-lg md:text-xl";

  return (
    <h3 className={`font-display leading-snug ${variantClass} ${className}`}>
      {line1}
      <br />
      <span className="playful-tilt">{line2}</span>
      <span className="text-accent">.</span>
    </h3>
  );
}
