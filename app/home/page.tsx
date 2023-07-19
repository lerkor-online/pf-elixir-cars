import Image from "next/image";
// esto es una prueba
export default function Home() {
  return (
    <main>
      <section className="bg-black h-[573px] text-center relative overflow-hidden">
        <header className="z-30 relative">
          <p className="text-white text-5xl drop-shadow pt-80">
            Si es un Blue Label lo encontras aquí.
          </p>
        </header>
        <footer></footer>
        <div className="absolute top-0 bottom-0 z-10">
          <video autoPlay muted loop src="/video.webm"></video>
        </div>
      </section>
      <section className="flex flex-row justify-center items-center p-10">
        <a
          className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
          href=""
        >
          <div>
            <Image
              src="/Frame-851.svg"
              alt="Elixir Logo"
              className="dark:invert"
              width={100}
              height={56}
              priority
            />
          </div>
          <div>
            <p className="text-base leading-5 tracking-tight font-bold">
              USADOS
            </p>
            <h4 className="leading-normal text-sm">Comprar / Vender </h4>
          </div>
        </a>
        <a
          className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
          href=""
        >
          <div>
            <Image
              src="/Frame-891.svg"
              alt="Elixir Logo"
              className="dark:invert"
              width={100}
              height={56}
              priority
            />
          </div>
          <div>
            <p className="text-base leading-5 tracking-tight font-bold">O KM</p>
            <h4 className="leading-normal text-sm">¡Todas las Marcas!</h4>
          </div>
        </a>
        <a
          className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
          href=""
        >
          <div>
            <Image
              src="/Frame-890.svg"
              alt="Elixir Logo"
              className="dark:invert"
              width={100}
              height={56}
              priority
            />
          </div>
          <div>
            <p className="text-base leading-5 tracking-tight font-bold">
              PLAN DE AHORRO
            </p>
            <h4 className="leading-normal text-sm">
              ¡Planes Seguros y Confiables!
            </h4>
          </div>
        </a>
      </section>
    </main>
  );
}
