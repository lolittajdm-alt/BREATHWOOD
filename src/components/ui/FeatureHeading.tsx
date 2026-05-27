type FeatureHeadingProps = {
  line1: string;
  line2: string;
  className?: string;
};

export function FeatureHeading({ line1, line2, className = "" }: FeatureHeadingProps) {
  return (
    <h3 className={`feature-heading ${className}`}>
      {line1}
      <br />
      <span className="playful-tilt">{line2}</span>
      <span className="text-accent">.</span>
    </h3>
  );
}
