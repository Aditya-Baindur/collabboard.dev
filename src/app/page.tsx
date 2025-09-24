export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div
        className="absolute inset-0
        bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)]
        bg-[size:24px_24px]
        [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]
        "
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <h1 className="text-5xl font-extrabold text-black">Hello World</h1>
      </div>
    </div>
  );
}
