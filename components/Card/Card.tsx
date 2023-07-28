import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Card({ auto }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/cars")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((auto) => (
        <div
          className="bg-white bg-opacity-50 shadow-md rounded-lg overflow-hidden w-[260px]"
          key={auto.id}
        >
          <img
            src={auto.imageUrl}
            className="w-[260px] h-[206px]"
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
              <span className="text-black">VER MÁS</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
