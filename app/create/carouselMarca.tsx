/* eslint-disable react/jsx-key */
import React from "react";
import json from "./createdata.json";
function CarouselMarca() {
  return (
    <div className="flex flex-col p-4 justify-normal items-center bg-slate-50">
      <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">
        Todas las Marcas
      </h1>

      <div className="flex flex-wrap my-2 mx-2 justify-normal items-center ">
        {json.map(({ id, name, logo }) => (
          <div className="flex flex-col w-40 h-20 mx-10 my-4 items-center justify-evenly">
            <img src={logo} alt={name} className="w-16 h-20 " />
            <h3 className="text-gray-900 tet">{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselMarca;
