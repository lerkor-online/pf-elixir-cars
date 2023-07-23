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
    <div className=" min-w-full flex-col items-center bg-slate-50 text-gray-600 body-font h730:mt-144 h742:mt-120 h935:mt-100 hdm:mt-20 lg:mt-16 xl:mt-16 2xl:mt-16">
      <h1 className=" text-center sm:text-3xl text-2xl font-medium title-font mb-4 pt-4 text-gray-900">
        AÑADE UN NUEVO VEHICULO
      </h1>

      <div className="flex items-center justify-center">
        <div className="h-16 w-16 border-solid border-2 border-gray-300 relative float-none">
          <img src={selectedData?.logo} alt={selectedData?.name} />
        </div>
        <div className="">
          <select
            className="m-4 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
            value={selectedCar}
            onChange={handleCarSelection}
          >
            <option className="m-1" value="">
              Seleccione una Marca
            </option>
            {json.map((car) => (
              <option key={car.id} value={car.name}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="m-4 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
            disabled={!selectedData?.models}
            value={selectedModel}
            onChange={handleModelSelection}
          >
            <option className="m-1" value="">
              Seleccione un Modelo de la Marca
            </option>
            {selectedData?.models &&
              selectedData.models.map((model) => (
                <option key={model.model} value={model.model}>
                  {model.model}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            className="m-4 w-fit h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
            disabled={!selectedModelData?.años}
            value={selectedYear}
            onChange={handleYearSelection}
          >
            <option className="m-1" value="">
              Seleccione el Año del Modelo
            </option>
            {selectedModelData &&
              selectedModelData.años &&
              selectedModelData.años.map((año: any) => (
                <option className="m-1" key={año} value={año}>
                  {año}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            disabled={!selectedModel}
            className="m-4 w-fit h-8 rounded-lg pl-2 text-gray-700 sm:text-sm hover:border-gray-900"
          >
            <option value="default">Estado</option>
            {selectedData ? (
              <>
                <option className="m-1" value="nuevo">
                  🟢 Nuevo
                </option>
                <option className="m-1" value="usado">
                  🟠 Usado
                </option>
              </>
            ) : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarsList;
