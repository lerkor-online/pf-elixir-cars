const Header = () => {
  return (
    <header>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url('https://images.pexels.com/photos/9260918/pexels-photo-9260918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          height: "100vh",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
        >
          <div className="flex  h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <section className="m-10">
                <h1 className="mb-6 text-5xl font-bold animate-pulse">
                  Elixir Cars
                </h1>
                <p className="text-2xl">
                  Somos la mejor empresa de compra y venta de automoviles
                </p>
              </section>
              <section className="flex max-sm:flex-col justify-center gap-5">
                <a href="/home">
                <button
                  type="button"
                  className="bg-[rgb(207,142,43)] hover:bg-[rgba(207,131,7,0.9)] active:scale-105 inline-block rounded border-2 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50  max-sm:rounded-full "
                  >
                  Ingresar
                </button>
                  </a>
                <button
                  type="button"
                  className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.11)] active:scale-105 inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 max-sm:rounded-full  "
                >
                  Registrarse
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
