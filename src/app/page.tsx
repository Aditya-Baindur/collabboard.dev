import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full
                    bg-[url('/images/tile-1-black.png')] bg-repeat bg-[length:10px_10px]">
      <div className="pointer-events-none absolute inset-0
                      bg-gradient-to-b from-transparent via-white/70 to-white" />

      <div className="relative z-10 flex h-screen items-center justify-center">
        <h1 className="text-5xl font-extrabold text-black">Hello World</h1>
      </div>
    </div>
  );
}
