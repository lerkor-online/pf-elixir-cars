"use client";
import { useState } from "react";

const Filters = () => {
  const [brand, setBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [state, setState] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minKm, setMinKm] = useState("");
  const [maxKm, setMaxKm] = useState("");

  return (
    <div className="mt-20 text-black">
      <div>
        <label>Brand:</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        ></select>
      </div>
      <div>
        <label>Car Model:</label>
        <select
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        ></select>
      </div>
      <div>
        <label>State:</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></select>
      </div>
      <div>
        <button>Apply Filters</button>
      </div>
    </div>
  );
};
export default Filters;
