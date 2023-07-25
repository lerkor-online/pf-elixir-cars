import React from "react"; // Asegúrate de importar React si aún no lo has hecho
/* import arrayCars from '@/carsapi.json'; */
import Link from "next/link";

const fetchCars = () => {
  return fetch("https://pf-elixir-cars-back-production.up.railway.app/cars", {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
};

/* async function getData() {
  const response = await fetch("http://localhost:3001/cars")
  return response.json()
} */

export default async function Cerokm() {
  const cars = await fetchCars();
  {
    console.log(cars);
  }
  return (
    <div>
      <header className="h-20"></header>
      <section className="m-4 w-11/12 flex justify-end uppercase">
        <select>
          <option>Orden Predeterminado</option>
        </select>
      </section>
      <section className="flex">
        <div className="w-2/12 p-6">
          <h3 className="text-xl font-bold p-2 bg-black rounded-md text-white text-center">
            Filtro
          </h3>
          <li>
            <div>
              <input type="checkbox" />
              <label>
                <a href="">En Stock Oportunidad</a>
              </label>
            </div>
          </li>
          <div>
            <div className="mt-6 ml-2 text-lg font-bold">Destacado</div>
            <div className="text-s">Aqui van los destacados a filtrar</div>
            <div className="mt-6 ml-2 text-lg font-bold">Marca</div>
            <div>Aqui van las marcas a filtrar</div>
          </div>
          <div className="mt-6 ml-2 text-lg font-bold">Precio</div>
          <div>Aqui van las precios a filtrar</div>
        </div>
        <div className=" mb-24 m-6 grid grid-cols-4 grid-rows-10 gap-2 h-auto w-9/12 mx-auto text-black items-center">
          {cars.map((auto: any) => (
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden w-[260px] "
              key={auto.id}
            >
              <img
                src={auto.imageUrl}
                className=" w-[260px] h-[206px]"
                // priority
                alt={auto.modelo}
              />
              <div className="p-2">
                <h2 className="pl-2 mt-0 font-bold font-MiAvenirRegular text-16 leading-16 flex items-center text-[#332F2E] m-0 uppercase">
                  {auto.brand.name}
                </h2>
                <p className="pl-2 first-letter:text-left text-[#332F2E] leading-14 text-xs uppercase mb-3 truncate line-clamp-3 overflow-hidden">
                  {auto.presentacion}
                </p>
                <div className="pl-2 mt-0">
                  <p className="text-xs">Precio</p>
                  <p className="text-xl font-bold">U$D {auto.precio}</p>
                </div>
              </div>
              <Link href="/0km/[id]" as={`/categoria-producto/0km/${auto.id}`}>
                <div className="bg-yellow-400 p-3 m-2 text-center rounded-lg shadow-lg rounded-4 text-[#332F2E] uppercase font-bold">
                  <span className=" text-black">VER MÁS</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
