export function LogoSvg({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="36" height="36" rx="10" fill="url(#navG)" />
      <rect width="36" height="36" rx="10" fill="url(#navH)" />
      <path d="M10.7 26.5V17.5a7.3 7.3 0 0 1 14.6 0v9" stroke="white" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      <path d="M7.3 26.5h21.4" stroke="white" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="navG" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="navH" x1="0" y1="0" x2="36" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.18" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
