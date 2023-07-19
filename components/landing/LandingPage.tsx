"use client";
import Carousel from "../carousel/Carousel";
import Newsletter from "../newsletter/Newsletter";

const LandingPage = () => {
  const images = [
    "https://img1.wallspic.com/crops/4/0/4/0/7/170404/170404-porsche-porsche_911_gt3_r_991-coche-deportivo-wapcar-3840x2160.jpg",
    "https://img1.wallspic.com/crops/2/5/7/7/6/167752/167752-carretera-cargador_esquivar_2022-dodge-dodge_charger_srt_hellcat-coche-3840x2160.jpg",
  ];

  return (
    <>
      <section className=" flex flex-wrap  max-sm:flex-col ">
        <section className="flex-grow w-96 max-md:w-auto">
          <Carousel images={images} />
        </section>
        <article className="flex-grow flex flex-col text-center justify-center  text">
          <h1 className="mb-2 text-4xl font-bold">Compra con nosotros!</h1>
          <ul className="flex max-sm:flex-col py-5 justify-center flex-wrap gap-4 text-lg font-bold text-neutral-800">
            <li>Mas seguro</li>
            <li>Nos adaptamos al usuario</li>
            <li>Manejamos todos los precios y marcas</li>
          </ul>
          <section>
            <button
              type="button"
              className="bg-[rgb(207,118,1)] hover:bg-[rgba(212,95,0,0.9)] active:scale-105 inline-block rounded border-2 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50  max-sm:rounded-full mb-4"
            >
              Comprar
            </button>
          </section>
        </article>
      </section>
      <section className="bg-slate-50 flex  max-sm:flex-col pt-10">
        <article className="flex-grow flex flex-col text-center justify-center  text">
          <h1 className="mb-2 text-4xl font-bold">Estas vendiendo tu auto?</h1>
          <img
            className="max-w-[500px] h-[300px] w-full m-auto mb-5 rounded-lg shadow-slate-400 shadow-lg"
            src="https://img.autosblogmexico.com/2020/11/05/5rGAqJ9J/venta-de-autos-0fbf.jpg"
            alt=""
          />
          <p className="pb-8 font-semibold text-lg">
            No dudes en hacer una cotizacion con nosotros!. Aqui evaluamos y
            compramos tu auto al mejor presio
          </p>
          <section>
            <button
              type="button"
              className="bg-[rgb(180,84,6)] hover:bg-[rgba(219,92,2,0.9)] active:scale-105 inline-block rounded border-2 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50  max-sm:rounded-full mb-4"
            >
              Cotizar
            </button>
          </section>
        </article>
      </section>
      <section className=" p-2 ">
        <Newsletter />
      </section>
    </>
  );
};

export default LandingPage;
