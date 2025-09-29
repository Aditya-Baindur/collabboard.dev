import Image from 'next/image';

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/images/logo2.svg" alt="collabboard logo" width={50} height={40} priority />
    </div>
  );
}
