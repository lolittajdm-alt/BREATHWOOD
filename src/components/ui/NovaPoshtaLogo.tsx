type NovaPoshtaLogoProps = {
  className?: string;
};

/** Спрощений логотип Нової Пошти для форми доставки */
export function NovaPoshtaLogo({ className = "h-8 w-8" }: NovaPoshtaLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <rect width="48" height="48" rx="10" fill="#DA291C" />
      <path
        fill="#fff"
        d="M10 14h6.2c4.8 0 7.8 2.4 7.8 6.4 0 2.3-1.1 4.1-3 5.1l4.4 8.5h-4.9l-4-7.8H14.2v7.8H10V14zm4.2 3.6v5.4h1.8c2.2 0 3.4-1 3.4-2.7s-1.2-2.7-3.4-2.7h-1.8zM29.2 14h8.4v3.4h-5.1v3.2h4.7v3.4h-4.7v7.2h-3.6V14z"
      />
    </svg>
  );
}
