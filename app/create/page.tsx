/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-key */
"use client";
import React, { ChangeEvent, useState } from "react";
import json from "./createdata.json";

const CarsList: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleCarSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCar(e.target.value);
    setSelectedModel("");
    setSelectedYear("");
  };

  const handleModelSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setSelectedYear("");
  };

  const handleYearSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const selectedData = json.find((item: any) => item.name === selectedCar);

  const selectedModelData = selectedData?.models?.find(
    (model) => model.model === selectedModel
  );

  return (
    <div className="bg-white p-4 mt-16 min-w-full justify-center overflow-hidden">
      <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">
        Añade un nuevo vehiculo
      </h1>

      <select
        className="mt-1.5 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
        value={selectedCar}
        onChange={handleCarSelection}
      >
        <option className="m-1" value="">
          Seleccione una marca de automóvil
        </option>
        {json.map((car) => (
          <option key={car.id} value={car.name}>
            {car.name}
          </option>
        ))}
      </select>
      <select
        className="mt-1.5 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
        disabled={!selectedData?.models}
        value={selectedModel}
        onChange={handleModelSelection}
      >
        <option className="m-1" value="">
          Seleccione un modelo
        </option>
        {selectedData?.models &&
          selectedData.models.map((model) => (
            <option key={model.model} value={model.model}>
              {model.model}
            </option>
          ))}
      </select>
      <select
        className="mt-1.5 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
        disabled={!selectedModelData?.años}
        value={selectedYear}
        onChange={handleYearSelection}
      >
        <option className="m-1" value="">
          Seleccione un año
        </option>
        {selectedModelData &&
          selectedModelData.años &&
          selectedModelData.años.map((año: any) => (
            <option className="m-1" key={año} value={año}>
              {año}
            </option>
          ))}
      </select>

      <div className="flex flex-col my-2 mx-2 justify-normal items-center ">
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
    </div>
  );
};

export default CarsList;
