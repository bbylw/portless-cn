import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Wrap({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

// 1 - Stable named URL (link + dotted chain)
export function IconLink(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
      <path d="M8 12h8" opacity={0.9} />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" opacity={0.18} />
    </Wrap>
  );
}

// 2 - HTTPS + HTTP2 (shield + lock + waves)
export function IconShield(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M12 3l7 3.5v5.2c0 3.9-2.4 6.2-7 8.1-4.6-1.9-7-4.2-7-8.1V6.5L12 3z" />
      <path d="M9.8 12l1.9 1.9 3.6-3.6" />
      <path d="M8.5 15.5c1.2.9 2.4 1.5 3.5 1.9 1.1-.4 2.3-1 3.5-1.9" opacity={0.5} />
    </Wrap>
  );
}

// 3 - Zero config (zap + sparkles)
export function IconZap(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M13 2L4.2 13.2H10l-1 8.8L19.8 10.8H13l0-8.8z" fill="currentColor" opacity={0.12} stroke="currentColor" />
      <path d="M13 2L4.2 13.2H10l-1 8.8L19.8 10.8H13l0-8.8z" />
      <circle cx="19" cy="5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="8" r="0.9" fill="currentColor" stroke="none" opacity={0.7} />
    </Wrap>
  );
}

// 4 - Subdomain (globe grid)
export function IconGlobe(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M3.2 12h17.6" />
      <path d="M12 3.8a14.2 14.2 0 0 1 0 16.4" />
      <path d="M12 3.8a14.2 14.2 0 0 0 0 16.4" />
      <ellipse cx="12" cy="12" rx="3.2" ry="8.2" opacity={0.45} />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </Wrap>
  );
}

// 5 - Git worktree (branching)
export function IconGit(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="7" cy="5.5" r="2.2" fill="currentColor" opacity={0.14} />
      <circle cx="7" cy="5.5" r="2.2" />
      <circle cx="17" cy="6" r="2" />
      <circle cx="7" cy="18.5" r="2.2" />
      <path d="M7 7.7v5.6a3 3 0 0 0 3 3h6" />
      <path d="M17 8v4a2 2 0 0 1-2 2H9" opacity={0.6} />
      <circle cx="7" cy="18.5" r="1" fill="currentColor" stroke="none" />
    </Wrap>
  );
}

// 6 - LAN (broadcast)
export function IconBroadcast(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="12" cy="12" r="2.6" fill="currentColor" opacity={0.16} />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="5.4" opacity={0.55} />
      <circle cx="12" cy="12" r="8.2" opacity={0.22} />
      <path d="M16.8 7.2l1.4-1.4" />
      <path d="M7.2 16.8l-1.4 1.4" />
      <path d="M16.8 16.8l1.4 1.4" />
      <path d="M7.2 7.2L5.8 5.8" />
    </Wrap>
  );
}

// 7 - Framework adapt (layers / code)
export function IconLayers(props: IconProps) {
  return (
    <Wrap {...props}>
      <rect x="3.2" y="4.2" width="12" height="9" rx="1.6" />
      <rect x="7.5" y="8.5" width="12" height="9" rx="1.6" fill="currentColor" opacity={0.10} />
      <rect x="7.5" y="8.5" width="12" height="9" rx="1.6" />
      <path d="M9.5 13.2l1.4 1.4-1.4 1.4" />
      <path d="M14.5 13.2l-1.4 1.4 1.4 1.4" />
    </Wrap>
  );
}

// 8 - Share (tailscale/ngrok)
export function IconShare(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M9 12l2 2 3.5-3.5" />
      <path d="M12 8.2v3.8" opacity={0.6} />
      <path d="M15.5 9.5c1.2 1.3 1.2 3.7 0 5" opacity={0.35} />
      <path d="M8.5 9.5a4.2 4.2 0 0 0 0 5" opacity={0.35} />
    </Wrap>
  );
}

// Advanced extra icons
export function IconTag(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M20 12l-8 8-8-8V4h8z" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <path d="M14 8l3 3" opacity={0.5} />
    </Wrap>
  );
}
export function IconPhone(props: IconProps) {
  return (
    <Wrap {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <circle cx="12" cy="18.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M9 6h6" opacity={0.6} />
    </Wrap>
  );
}
export function IconUsers(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="9" cy="8.5" r="2.7" />
      <path d="M3.5 18a4.5 4.5 0 0 1 4.5-4.5H12" />
      <circle cx="17" cy="10.2" r="2.1" opacity={0.9} />
      <path d="M15.2 18a3.6 3.6 0 0 1 3.6-3.6" opacity={0.7} />
    </Wrap>
  );
}
export function IconPlug(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M9 7V3.5h6V7" />
      <rect x="7" y="7" width="10" height="6.5" rx="1.6" />
      <path d="M12 13.5v4.5" />
      <path d="M9 18h6" />
      <circle cx="10" cy="2.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="2.2" r="0.9" fill="currentColor" stroke="none" />
    </Wrap>
  );
}
export function IconSettings(props: IconProps) {
  return (
    <Wrap {...props}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 2.2v2.4M12 19.4v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.2 12h2.4M19.4 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </Wrap>
  );
}
export function IconStethoscope(props: IconProps) {
  return (
    <Wrap {...props}>
      <path d="M7.5 3.5a3.2 3.2 0 0 1 3.2 3.2v5.2a3.2 3.2 0 0 1-6.4 0V6.7a3.2 3.2 0 0 1 3.2-3.2z" />
      <path d="M10.7 11.9c1.6 0 3 0.8 3.8 2 1.4 2 3.1 2.6 4.2 1.6 1-1 0.5-2.7-1.6-4.1" />
      <circle cx="18.2" cy="16.2" r="1.8" />
      <path d="M7.5 12v2.2a2.2 2.2 0 0 0 2.2 2.2" opacity={0.5} />
    </Wrap>
  );
}

// Logo mark (for navbar/footer) - crisp P
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="32" height="32" rx="9" fill="url(#logoG)" />
      <defs>
        <linearGradient id="logoG" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <path d="M10.2 22V9.8h5.1c1.55 0 2.78.42 3.68 1.26.9.84 1.35 1.98 1.35 3.42 0 1.44-.45 2.58-1.35 3.42-.9.84-2.13 1.26-3.68 1.26h-2.4V22h-2.7zm2.7-5.05h1.9c.7 0 1.23-.17 1.6-.52.37-.35.55-.84.55-1.48 0-.64-.18-1.13-.55-1.48-.37-.35-.9-.52-1.6-.52h-1.9v4z" fill="white" />
    </svg>
  );
}

// Hero architecture icons
export function IconBrowserSmall(props: IconProps) {
  return (
    <Wrap {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
      <path d="M2.5 8.5h19" />
      <circle cx="6" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8.8" cy="6.5" r="0.9" fill="currentColor" stroke="none" opacity={0.6} />
      <circle cx="11.6" cy="6.5" r="0.9" fill="currentColor" stroke="none" opacity={0.3} />
      <path d="M7 13l2 2 3.5-3.5" />
    </Wrap>
  );
}
