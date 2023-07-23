import React from "react"; // Asegúrate de importar React si aún no lo has hecho
import arrayCars from "@/carsapi.json";

export default function Cerokm() {
  return (
    <div>
      <div className="ml-16 mt-24 mb-24 grid grid-cols-4 grid-rows-10 gap-2 h-auto w-auto text-black items-center">
        {arrayCars.map((auto) => (
          <div
            className="bg-white h-max shadow-md rounded-lg overflow-hidden w-[260px]"
            key={auto.id}
          >
            <img
              src={auto.imageUrl}
              className=" w-[260px] h-[206px]"
              priority
              alt={auto.modelo}
            />
            <div className="p-2">
              <h2 className="pl-2 mt-0 font-bold font-MiAvenirRegular text-16 leading-16 flex items-center text-[#332F2E] m-0 uppercase">
                {auto.marca}
              </h2>
              <p className=" pl-2 first-letter:text-left text-[#332F2E] leading-14 text-xs uppercase mb-3">
                {auto.modelo}
              </p>
              <div className="pl-2 mt-0">
                <p className="text-xs">Precio</p>
                <p className="text-xl font-bold">U$D {auto.precio}</p>
              </div>
            </div>
            <div className="bg-yellow-400 p-3 m-2 text-center rounded-lg shadow-lg rounded-4 text-[#332F2E] uppercase font-bold">
              <a className=" text-black" href="">
                VER MÁS
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
