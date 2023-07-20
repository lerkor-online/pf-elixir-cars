/* eslint-disable react/jsx-key */
import React from "react";
import casr from "./createdata.json";

console.log(casr);
function Create_Cars() {
  return (
    <form className="bg-slate-50 p-4 mt-16 min-w-full justify-center overflow-hidden">
      <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">
        Añade un nuevo vehiculo
      </h1>
      <div className="flex flex-col w-10 ">
        {casr.marca.map((auto) => (
          <img src={auto.logo} alt="" />
        ))}
      </div>
      <select
        placeholder="select marca"
        className="min-w-min text-center text-gray-900"
      >
        {casr.marca.map((auto) => (
          <option className="w-full text-left text-gray-900">
            <img src={auto.logo} alt="no-found" />
            {auto.name}
          </option>
        ))}
      </select>
      {/* <div className="flex flex-col">
        <label className="block text-sm mb-1" id="namesuccess">
          Your Name
        </label>
        <input
          className="form-input bg-slate-50 text-gray-700"
          placeholder="Praveen Juge"
          id="namesuccess"
        />
        <span className="text-green-700 text-sm mt-1">
          That's your name alright!
        </span>
        <button
          className="btn btn-light bg-slate-50 text-gray-700"
          x-data="tooltip()"
          x-spread="tooltip"
          title="submit"
        >
          <img
            src="https://images0.autocasion.com/unsafe/60x60/eurotax/02/2433/73a747fef1dbbd6b71d25ce899f96405d9cf6e87.jpeg"
            alt=""
          />
          Tooltip on top
        </button>
      </div> */}
    </form>
  );
}

export default Create_Cars;
