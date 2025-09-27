import clsx from 'clsx';

export function BrandLogo({ className, withWordmark = false }: { className?: string; withWordmark?: boolean }) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <svg
        className="h-10 w-10 shrink-0"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="logo-blue" x1="12" y1="20" x2="108" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F9BFF" />
            <stop offset="1" stopColor="#4D6BFF" />
          </linearGradient>
          <linearGradient id="logo-purple" x1="32" y1="16" x2="108" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A6BFF" />
            <stop offset="1" stopColor="#B288FF" />
          </linearGradient>
          <linearGradient id="logo-mint" x1="24" y1="36" x2="92" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60F6C3" />
            <stop offset="1" stopColor="#43C9B1" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="66" height="66" rx="14" fill="url(#logo-blue)" opacity="0.9" />
        <rect x="42" y="30" width="66" height="66" rx="14" fill="url(#logo-purple)" opacity="0.85" />
        <rect x="28" y="46" width="66" height="66" rx="14" fill="url(#logo-mint)" />
        <path
          d="M70.4 65.5L56.1 79.1c-.5.5-1 .9-1.3 1.5l-4.1 7.8c-.8 1.6 1 3.4 2.6 2.6l7.8-4.1c.6-.3 1-.8 1.5-1.3l14.3-14.3c2.1-2.1 2.1-5.5 0-7.6-2.1-2.1-5.5-2.1-7.5 0Z"
          fill="#0F172A"
        />
        <path
          d="M71 56.9c1.9 1.9 5 1.9 6.9 0 1.9-1.9 1.9-5 0-6.9-1.9-1.9-5-1.9-6.9 0-1.9 1.9-1.9 5 0 6.9Z"
          fill="#0F172A"
        />
      </svg>
      {withWordmark ? (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-semibold text-slate-900">collabboard</span>
          <span className="text-xs font-medium tracking-[0.32em] text-slate-400 uppercase">.dev</span>
        </div>
      ) : null}
    </div>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return <BrandLogo className={className} withWordmark />;
}
