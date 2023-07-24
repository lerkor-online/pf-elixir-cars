"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
}

interface Model {
  name: string;
}

interface CarData {
  year: number;
  presentation: string | undefined;
  price: number | undefined;
  mileage: number | undefined;
  fuel: string | undefined;
}

interface DataSheet {
  motor: string | undefined;
  pasajeros: number | undefined;
  carroceria: string | undefined;
  transmision: string | undefined;
  traccion: string | undefined;
  llantas: number | undefined;
  potencia: number | undefined;
  puertas: number | undefined;
  baul: number | undefined;
  airbag: number | undefined;
}

interface CombinedData extends CarData, DataSheet {
  brand: Brand;
  model: Model;
}

interface AddCarsProps {
  brands?: Brand[];
}

const AddCars: React.FC<AddCarsProps> = ({ brands }) => {
  const [brandList, setBrandList] = useState(brands);
  const [modelList, setModelList] = useState<Model[]>([]);
  const [carData, setCarData] = useState<CarData[]>([]);
  const [dataSheet, setDataSheet] = useState<DataSheet[]>([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newYear, setNewYear] = useState("");

  const [isAddingBrand] = useState(false);
  const [showAddBrandInput, setShowAddBrandInput] = useState(false);
  const [showAddModelInput, setShowAddModelInput] = useState(false);
  const [showAddYearInput, setShowAddYearInput] = useState(false);
  const [showDataSheet, setShowshowDataSheet] = useState(false);

  const [activeTab, setActiveTab] = useState<"stock" | "addVehicle">("stock");

  // const [stock, setStock] = useState<string[]>([]);
  // const [newVehicle, setNewVehicle] = useState<string>("");

  // Variables para "Añadir al inventario"
  const [inventoryBrand, setInventoryBrand] = useState("");
  const [inventoryModel, setInventoryModel] = useState("");
  const [inventoryModelList, setInventoryModelList] = useState<
    Array<{ name: string }>
  >([]);

  // Variables para "Añadir un nuevo vehículo"
  const [newVehicleBrand, setNewVehicleBrand] = useState("");
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [newVehicleModelList, setNewVehicleModelList] = useState<
    Array<{ name: string }>
  >([]);

  const [selectedState, setSelectedState] = useState("");

  const combinedData: CombinedData = {
    year: 0,
    presentation: "",
    price: 0,
    mileage: 0,
    fuel: "",
    motor: "",
    pasajeros: 0,
    carroceria: "",
    transmision: "",
    traccion: "",
    llantas: 0,
    potencia: 0,
    puertas: 0,
    baul: 0,
    airbag: 0,
    brand: {
      id: 0,
      name: "",
    },
    model: {
      name: "",
    },
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:3001/brands");
      const brands = await response.json();
      setBrandList(brands);
    } catch (error) {
      console.error("Erroral obtener las marcas:", error);
      setBrandList([]);
    }
  };

  const fetchModels = async (brandName: string) => {
    console.log(brandName);
    try {
      const response = await fetch(
        `http://localhost:3001/carModels/byBrand?brand=${brandName}`
      );
      console.log(response);
      const models = await response.json();
      setInventoryModelList(models);
      setNewVehicleModelList(models);
      setInventoryModel("");
      setNewVehicleModel("");
    } catch (error) {
      console.error("Error al obtener los modelos:", error);
      setModelList([]);
    }
  };

  const fetchYears = async (brandName: string, modelName: string) => {
    console.log(brandName, modelName);
    try {
      const response = await fetch(
        `http://localhost:3001/years/${brandName}/${modelName}`
      );
      const years = await response.json();
      setCarData(years);
    } catch (error) {
      console.error("Erroral obtener los años:", error);
      setCarData([]);
    }
  };

  if (!brands) {
    fetchBrands();
  }

  const handleBrandSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    console.log(selectedBrand);

    // if (selectedBrand === "add") {
    //   setNewBrand("add");
    //   return;
    // }
    if (selectedBrand === "add") {
      setShowAddBrandInput(true);
      setNewBrand("");
      setSelectedState("");
    } else {
      setShowAddBrandInput(false);
      setNewBrand(selectedBrand);
      setSelectedState("");
    }
    setInventoryBrand(selectedBrand);
    setNewVehicleBrand(selectedBrand);

    setSelectedBrand("");
    setSelectedYear("");

    fetchModels(selectedBrand);
  };

  const handleModelSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value;
    console.log(selectedModel);

    if (selectedModel === "add") {
      setShowAddModelInput(true);
      setShowAddYearInput(true);
      setNewModel("");
      setSelectedState("");
    } else {
      setShowAddModelInput(false);
      setShowAddYearInput(false);
      setNewModel(selectedModel);
      setSelectedState("");
    }

    const { value } = e.target;
    if (value !== "") {
      setShowAddYearInput(true);
    } else {
      setShowAddYearInput(false);
    }
    setInventoryModel(selectedModel);
    setNewVehicleModel(selectedModel);

    setSelectedYear("");

    fetchYears(selectedBrand, selectedModel);
  };

  const handleYearSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleStateSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const selectedValue = e.target.value;
    setSelectedModel(selectedValue);
    setShowshowDataSheet(selectedValue !== "");
  };

  const handleCancelAddBrand = () => {
    setShowAddBrandInput(false);
    setShowAddModelInput(false);
    setNewBrand("");
    setSelectedState("");
    setNewVehicleBrand("");
  };

  const handleCancelAddModel = () => {
    setShowAddModelInput(false);
    setNewModel("");
    setSelectedState("");
    setNewVehicleModel("");
  };

  const handleCancelAddYear = () => {
    setShowAddYearInput(false);
    setNewYear("");
  };
  // const handleSaveBrand = () => {
  //   // Aquí puedes enviar la nueva marca al servidor
  //   // y luego volver a cargar las marcas desde el servidor
  //   // para actualizar la lista
  //   setIsAddingBrand(false);
  //   setNewBrand("");
  //   setSelectedBrand("");
  //   setSelectedModel("");
  //   setSelectedYear("");
  //   fetchBrands();
  // };

  // const handleAddToStock = () => {
  //   setStock((prevStock) => [...prevStock, newVehicle]);
  //   setNewVehicle("");
  // };
  const handleSubmit = () => {
    axios
      .post("/api/backend-url", combinedData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleAddNewVehicle = () => {
  //   setStock([]);
  //   setNewVehicle("");
  // };
  const handleInventorySubmit = () => {
    // Envío el formulario de "Añadir al inventario"
    console.log("Marca seleccionada para el inventario:", inventoryBrand);
    console.log("Modelo seleccionado para el inventario:", inventoryModel);
  };

  const handleNewVehicleSubmit = () => {
    // Envio el formulario de "Añadir un nuevo vehículo"
    console.log("Nueva marca de vehículo:", newVehicleBrand);
    console.log("Nuevo modelo de vehículo:", newVehicleModel);
  };

  return (
    <div className="mt-16 min-w-full flex-col items-center bg-slate-50 text-gray-600 body-font h730:mt-144 h742:mt-120 h935:mt-100 hdm:mt-20 lg:mt-16 xl:mt-16 2xl:mt-16">
      <div className="p-4 flex justify-center">
        <button
          className={`mr-4 py-2 px-4 rounded-lg ${
            activeTab === "stock"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-gray-200  hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          }`}
          onClick={() => {
            setActiveTab("stock");
            // Restablecer las variables de estado del formulario "Añadir al inventario" al cambiar de pestaña
            setSelectedState("");
            setInventoryBrand("");
            setInventoryModelList([]);
            handleCancelAddBrand();
            handleCancelAddModel();
            handleCancelAddYear();
          }}
        >
          Añadir al Inventario
        </button>

        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "addVehicle"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-gray-200  hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200  rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          }`}
          onClick={() => {
            setActiveTab("addVehicle");
            // Restablecer la variable de estado del formulario "Añadir un nuevo vehículo" al cambiar de pestaña
            setSelectedState("");
            setNewVehicleBrand("");
            setNewVehicleModelList([]);
          }}
        >
          Añadir un Nuevo Vehículo
        </button>

        <button
          className={
            "ml-4 py-2 px-4 bg-gray-500 text-gray-200  hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200  rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#ff7300]"
          }
          onClick={() => {
            // Restablecer la variable de estado del formulario "Añadir un nuevo vehículo" al cambiar de pestaña
            setSelectedState("");
            setNewVehicleBrand("");
            setNewVehicleModelList([]);
            handleCancelAddBrand();
            handleCancelAddModel();
            handleCancelAddYear();
          }}
        >
          {" "}
          RELOAD{" "}
        </button>
      </div>

      {/* --------------------------------------------------------------------------------------------------------- */}

      <div className="mt-4">
        {activeTab === "stock" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-center">
              AÑADE AL INVENTARIO
            </h2>
            <form
              onSubmit={handleInventorySubmit}
              className="flex flex-row m-auto w-fit"
            >
              <div>
                <select
                  className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                  value={inventoryBrand}
                  onChange={handleBrandSelection}
                  disabled={isAddingBrand}
                >
                  <option className="m-1" disabled value="">
                    Seleccione una Marca
                  </option>
                  {brandList?.length ? (
                    brandList?.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))
                  ) : (
                    <option disabled className="text-green-500">
                      Cargando marcas...
                    </option>
                  )}
                </select>
              </div>

              <div>
                <select
                  className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                  value={inventoryModel}
                  onChange={handleModelSelection}
                  disabled={!inventoryBrand || isAddingBrand}
                >
                  <option className="m-1" value="">
                    Seleccione un Modelo
                  </option>
                  {Array.isArray(inventoryModelList) &&
                    inventoryModelList?.map((model, index) => (
                      <option key={index} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <select
                  className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                  value={selectedYear}
                  onChange={handleYearSelection}
                  disabled={!inventoryBrand || !inventoryModel || isAddingBrand}
                >
                  <option className="m-1" value="">
                    Seleccione un Año
                  </option>
                  {carData.map((element, index) => (
                    <option key={index} value={element.year}>
                      {element.year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedState}
                  onChange={handleStateSelection}
                  disabled={!inventoryBrand || !inventoryModel || isAddingBrand}
                  className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                >
                  <option value="">Estado</option>
                  {brandList ? (
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
            </form>
            <div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700]">
                AÑADIR VEHICULO
              </button>
            </div>
          </div>
        )}

        {activeTab === "addVehicle" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">AÑADE UN NUEVO VEHÍCULO</h2>
            <form
              onSubmit={handleNewVehicleSubmit}
              className="flex flex-row m-auto w-fit"
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-row m-auto w-fit">
                  {showAddBrandInput ? (
                    <div className="flex flex-row items-center">
                      <input
                        type="text"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        placeholder="Nueva Marca"
                        className="border border-gray-300 rounded-s-lg px-4 py-2 my-4 "
                      />
                      <button
                        onClick={handleCancelAddBrand}
                        className="w-8 h-10 py-2 mr-4 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
                      >
                        <span className="text-xl font-bold">X</span>
                      </button>
                    </div>
                  ) : (
                    <select
                      value={newVehicleBrand}
                      onChange={handleBrandSelection}
                      className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                      disabled={isAddingBrand}
                    >
                      <option disabled value="">
                        Selecciona una marca
                      </option>
                      {brandList?.map((brand) => (
                        <option key={brand.id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                      <option className="text-blue-500" value="add">
                        Agregar Marca
                      </option>
                    </select>
                  )}

                  {showAddModelInput ? (
                    <div className="flex flex-row items-center">
                      <input
                        type="text"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        placeholder="Nuevo Modelo"
                        className="border border-gray-300 rounded-s-lg px-4 py-2 my-4 "
                      />
                      <button
                        onClick={handleCancelAddModel}
                        className="w-8 h-10 py-2 mr-2 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
                      >
                        <span className="text-xl font-bold">X</span>
                      </button>
                    </div>
                  ) : (
                    <select
                      value={newVehicleModel}
                      onChange={handleModelSelection}
                      className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                      disabled={!newVehicleBrand || isAddingBrand}
                    >
                      <option disabled value="">
                        Selecciona un modelo
                      </option>
                      {Array.isArray(newVehicleModelList) &&
                        newVehicleModelList.map((model, index) => (
                          <option key={index} value={model.name}>
                            {model.name}
                          </option>
                        ))}
                      <option className="text-blue-500" value="add">
                        Agregar Modelo
                      </option>
                    </select>
                  )}

                  {showAddYearInput && (
                    <div className="flex flex-row items-center">
                      <input
                        type="text"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        placeholder="Año del vehículo"
                        className="border border-gray-300 rounded-s-lg px-4 py-2 my-4 "
                      />
                      <button
                        onClick={handleCancelAddYear}
                        className="w-8 h-10 py-2 mr-2 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
                      >
                        <span className="text-xl font-bold">X</span>
                      </button>
                    </div>
                  )}

                  <div>
                    <select
                      value={selectedState}
                      onChange={handleStateSelection}
                      disabled={
                        !newVehicleBrand || !newVehicleModel || isAddingBrand
                      }
                      className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                    >
                      <option value="">Estado</option>
                      {brandList ? (
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

                <div>
                  {newVehicleBrand && newVehicleModel && (
                    <div className="flex flex-col items-center">
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="presentacion">Presentación:</label>
                          <input
                            type="text"
                            id="presentacion"
                            name="presentacion"
                            onChange={handleChange}
                            placeholder="Presentación"
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="precio">Precio:</label>
                          <input
                            type="text"
                            id="precio"
                            name="precio"
                            onChange={handleChange}
                            placeholder="Precio"
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="kilometraje">Kilometraje:</label>
                          <input
                            type="text"
                            id="kilometraje"
                            name="kilometraje"
                            onChange={handleChange}
                            placeholder="Kilometraje"
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="combustible">Combustible:</label>
                          <input
                            type="text"
                            id="combustible"
                            name="combustible"
                            onChange={handleChange}
                            placeholder="Combustible"
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-10/12 mb-10">
                  {newVehicleBrand && newVehicleModel && (
                    <div className="flex flex-col items-center">
                      <h2>FICHA TÉCNICA</h2>
                      <div className="flex flex-wrap justify-evenly my-1 mx-20">
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="motor">Motor:</label>
                          <input
                            type="text"
                            id="motor"
                            name="motor"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="pasajeros">Pasajeros:</label>
                          <input
                            type="text"
                            id="pasajeros"
                            name="pasajeros"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="carroceria">Carrocería:</label>
                          <input
                            type="text"
                            id="carroceria"
                            name="carroceria"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="transmision">Transmisión:</label>
                          <input
                            type="text"
                            id="transmision"
                            name="transmision"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="traccion">Tracción:</label>
                          <input
                            type="text"
                            id="traccion"
                            name="traccion"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="llantas">Llantas:</label>
                          <input
                            type="text"
                            id="llantas"
                            name="llantas"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="potencia">Potencia:</label>
                          <input
                            type="text"
                            id="potencia"
                            name="potencia"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="puertas">Puertas:</label>
                          <input
                            type="text"
                            id="puertas"
                            name="puertas"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="baul">Baúl:</label>
                          <input
                            type="text"
                            id="baul"
                            name="baul"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                        <div className="flex flex-col mt-2 mx-2">
                          <label htmlFor="airbag">Airbag:</label>
                          <input
                            type="text"
                            id="airbag"
                            name="airbag"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <button
              className="bg-blue-500 text-white py-2 px-4 mb-10 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700]"
              onClick={handleSubmit}
            >
              AÑADIR VEHICULO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCars;
