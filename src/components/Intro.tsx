export default function Intro() {
  return (
    <section>
        <div className="relative min-h-screen w-full bg-white">
              <div
                className="absolute inset-0
                bg-[url('/images/tile-1-black.png')] bg-repeat bg-[length:5px_5px]
                [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                [mask-repeat:no-repeat] [mask-size:cover]"
              />


                <div className="relative z-10 flex min-h-screen items-center justify-center">
                    <div className="bg-amber-400 py-3 px-3">
                    <h1 className="text-5xl font-extrabold text-black ">Hello World</h1>
                    </div>
                </div>

                
              </div>
          

    </section>
    
  )
}
