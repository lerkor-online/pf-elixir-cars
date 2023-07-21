/* eslint-disable react/jsx-key */
import React from "react";
import json from "./createdata.json";

const cars = json.map((auto: { name: string; logo: string }) => {
  return {
    name: auto.name,
    logo: auto.logo,
  };
});

console.log(cars);
function Create_Cars() {
  return (
    <form className="bg-slate-50 p-4 mt-16 min-w-full justify-center overflow-hidden">
      <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">
        Añade un nuevo vehiculo
      </h1>
      <select className="min-w-min w-52 text-center text-gray-900">
        <img className="w-10 h-10 flex" src={cars[0].logo} alt={"cars"} />
        {cars.map((auto, index) => (
          <>
            <option key={index} className="w-full text-left text-gray-900">
              <h1>{auto.name}</h1>
            </option>
          </>
        ))}
      </select>
    </form>
  );
}

export default Create_Cars;
