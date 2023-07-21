/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsonData from "./createdata.json";

console.log(jsonData);

interface MyData {
  id: number;
  name: string;
  logo: string;
}

// Lee el archivo JSON

function Create_Cars() {
  //   const [selectedName, setSelectedName] = useState<string>("");
  //   const [selectedObject, setSelectedObject] = useState<MyData | null>(null);
  //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const name = e.target.value;
  //     const selectedObj = data.find((item) => item.name === name);
  //     setSelectedObject(selectedObj || null);
  //   };
  return (
    <form className="bg-white p-4 mt-16 min-w-full justify-center overflow-hidden">
      <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">
        Añade un nuevo vehiculo
      </h1>
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-52 h-8 rounded-lg pl-2 border-gray-300 text-gray-700 sm:text-sm"
      >
        {data.map(({ id, name, logo }) => (
          <option key={id}>{name}</option>
        ))}
      </select>

      <div className="flex flex-wrap my-2 mx-2 justify-normal items-center ">
        {data.map(({ id, name, logo }) => (
          <div className="flex flex-col w-16 h-18 mx-10 my-4 items-center">
            <img src={logo} alt={name} className="w-16 h-14 " />
            <h3 className="text-gray-900 tet">{name}</h3>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Create_Cars;
