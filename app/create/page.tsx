/* eslint-disable quote-props */
"use client";
import React, { ChangeEvent, useState, useLayoutEffect, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// interface FichaTecnica {
//   motor: string;
//   pasajeros: string;
//   carroceria: string;
//   transmision: string;
//   traccion: string;
//   llantas: string;
//   potencia: string;
//   puertas: string;
//   baul: string;
//   airbag: string;
// }

export interface CarData {
  marca: string;
  modelo: string;
  presentacion: string;
  precio: number;
  estado: string;
  year: number;
  imageUrl: string[];
  combustible: string;
  kilometraje: number | string;
  fichaTecnica: {
    Motor: string;
    Pasajeros: string;
    Carroceria: string;
    Transmision: string;
    Traccion: string;
    Llantas: string;
    Potencia: string;
    Puertas: string;
    Baul: string;
    airbag: string;
  };
}
const AddCars: React.FC<CarData> = ({ marca }) => {
  const [brandList, setBrandList] = useState(marca);
  const [modelList, setModelList] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newYear, setNewYear] = useState("");

  const [isAddingBrand] = useState(false);

  const [showAddBrandInput, setShowAddBrandInput] = useState(false);
  const [showAddModelInput, setShowAddModelInput] = useState(false);
  const [showAddYearInput, setShowAddYearInput] = useState(false);

  const [activeTab, setActiveTab] = useState<"stock" | "addVehicle">("stock");

  // Variables para "Añadir al inventario"
  const [inventoryBrand, setInventoryBrand] = useState("");
  const [inventoryModel, setInventoryModel] = useState("");
  const [inventoryModelList, setInventoryModelList] = useState<
    Array<{ name: string }>
  >([]);

  // Variables para "Añadir un nuevo vehículo"
  const [newVehicleBrand, setNewVehicleBrand] = useState("");
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [newVehicleYear, setNewVehicleYear] = useState("");
  const [newVehicleModelList, setNewVehicleModelList] = useState<
    Array<{ name: string }>
  >([]);

  const [selectedState, setSelectedState] = useState("");

  const [formData, setFormData] = useState<CarData>({
    marca: "",
    modelo: "",
    presentacion: "",
    precio: 0,
    estado: "",
    year: 0,
    imageUrl: [],
    kilometraje: "",
    combustible: "",
    fichaTecnica: {
      Motor: "",
      Pasajeros: "",
      Carroceria: "",
      Transmision: "",
      Traccion: "",
      Llantas: "",
      Potencia: "",
      Puertas: "",
      Baul: "",
      airbag: "",
    },
  });

  const [isButtonActive, setIsButtonActive] = useState(false); // Variable para activar el boton de añadir si el formulario es valido

  // Variables de validación
  const [isBrandValid, setIsBrandValid] = useState(true);
  const [isCarModelValid, setIsCarModelValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isPresentacionValid, setIsPresentacionValid] = useState(true);
  const [isPrecioValid, setIsPrecioValid] = useState(true);
  const [isKilometrajeValid, setIsKilometrajeValid] = useState(true);
  const [isCombustibleValid, setIsCombustibleValid] = useState(true);
  const [isImageUrlValid, setIsImageUrlValid] = useState(true);

  // Variables para detectar estados de los inputs
  const [isYearFocused, setIsYearFocused] = useState(false);
  const [isBrandFocused, setIsBrandFocused] = useState(false);
  const [isCarModelFocused, setIsCarModelFocused] = useState(false);
  const [isPresentacionFocused, setIsPresentacionFocused] = useState(false);
  const [isPrecioFocused, setIsPrecioFocused] = useState(false);
  const [isKilometrajeFocused, setIsKilometrajeFocused] = useState(false);
  const [isCombustibleFocused, setIsCombustibleFocused] = useState(false);
  const [isImageUrlFocused, setIsImageUrlFocused] = useState(false);

  const [isSelectHovered, setIsSelectHovered] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isStateValid, setIsStateValid] = useState(true);

  const [isAddingModel, setIsAddingModel] = useState(false);
  const [isSelectEnabled, setIsSelectEnabled] = useState(false);

  const selectRef = useRef(null);

  useLayoutEffect(() => {
    const {
      presentacion,
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
      marca,
      modelo,
    } = formData;

    // Validación del rango de los años
    const currentYear = new Date().getFullYear();
    const minYear = 2010;
    const validYear = year >= minYear && year <= currentYear;
    setIsYearValid(validYear);

    // Validación de propiedad marca
    const brandRegex = /^(?!\s*$)[a-zA-Z\- ]{2,10}$/;
    const validBrand = brandRegex.test(marca);
    setIsBrandValid(validBrand);

    // Validación de propiedad modelo
    const carModelRegex = /^(?!\s*$)[A-Za-z\-. ]{2,20}$/;
    const validCarModel = carModelRegex.test(modelo);
    setIsCarModelValid(validCarModel);

    // Validación de propiedad presentacion
    const presentacionRegex = /^(?!\s*$)[A-Za-z.\- ]{5,30}$/;
    const validPresentacion = presentacionRegex.test(presentacion);
    setIsPresentacionValid(validPresentacion);

    // Validación de propiedad precio
    const precioRegex = /^\d{4,6}$/;
    const validPrecio = precioRegex.test(precio.toString());
    setIsPrecioValid(validPrecio);

    // Validación de propiedad kilometro
    const kilometrajeRegex = /^\d{0,6}$/;
    const validKilometraje = kilometrajeRegex.test(kilometraje.toString());
    const validInput = kilometraje !== "" && validKilometraje;
    setIsKilometrajeValid(validInput);

    // Validación de propiedad combustible
    const validCombustible = ["gasolina", "gasoil", "electrica"].includes(
      combustible
    );
    setIsCombustibleValid(validCombustible);

    // Validación de propiedad imageUrl
    const imageUrlRegex =
      /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S+)?\.(png|jpg|jpeg|gif)$/;
    const validImageUrl =
      (typeof imageUrl === "string" && imageUrl !== "") ||
      (Array.isArray(imageUrl) &&
        imageUrl.length > 0 &&
        imageUrl.every((url) => imageUrlRegex.test(url)));
    setIsImageUrlValid(validImageUrl);

    // Validaciónes de formulario completo
    const isFormDataValid =
      validPresentacion &&
      validPrecio &&
      estado !== "" &&
      validImageUrl &&
      isYearValid &&
      validKilometraje &&
      validCombustible &&
      fichaTecnica.Motor !== "" &&
      fichaTecnica.Pasajeros !== "" &&
      fichaTecnica.Carroceria !== "" &&
      fichaTecnica.Transmision !== "" &&
      fichaTecnica.Traccion !== "" &&
      fichaTecnica.Llantas !== "" &&
      fichaTecnica.Potencia !== "" &&
      fichaTecnica.Puertas !== "" &&
      fichaTecnica.Baul !== "" &&
      fichaTecnica.airbag !== "" &&
      isBrandValid &&
      isCarModelValid;

    setIsButtonActive(isFormDataValid);
  }, [formData, isBrandValid, isCarModelValid, isYearValid]);

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:3001/brands", {
        next: {
          revalidate: 10,
        },
      });
      const brands = await response.json();
      setBrandList(brands);
    } catch (error) {
      console.error("Erroral obtener las marcas:", error);
    }
  };

  const fetchModels = async (brandName: string) => {
    console.log(brandName);
    try {
      const response =
        brandName !== "add"
          ? await fetch(
              `http://localhost:3001/carModels/byBrand?brand=${brandName}`,
              {
                next: {
                  revalidate: 10,
                },
              }
            )
          : null;

      console.log(response);
      const models = await response?.json();
      setInventoryModelList(models);
      setNewVehicleModelList(models);
    } catch (error) {
      console.error("Error al obtener los modelos:", error);
    }
  };

  // const fetchYears = async (selectedBrand: string, modelName: string) => {
  //   console.log(selectedBrand);
  //   // console.log(brandList, modelName);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/years?${selectedBrand}=${modelName}`,
  //       {
  //         next: {
  //           revalidate: 10,
  //         },
  //       }
  //     );
  //     const years = await response.json();
  //     setCarData(years);
  //   } catch (error) {
  //     console.error("Erroral obtener los años:", error);
  //     setCarData([]);
  //   }
  // };

  if (!marca) {
    fetchBrands();
  }
  const handleChangeBrands = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      marca: inputValue,
    }));
    setNewBrand(inputValue);
  };

  const handleBrandSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;

    // if (selectedBrand === "add") {
    //   setNewBrand("add");
    //   return;
    // }

    if (selectedBrand === "add") {
      setShowAddBrandInput(true);
      setShowAddModelInput(false);
      setNewModel("");
      setNewVehicleModel("");
      setSelectedState("");
    } else {
      setShowAddBrandInput(false);
      setNewBrand(selectedBrand);
      setNewVehicleModel("");
      setSelectedState("");
    }

    setInventoryBrand(selectedBrand);
    setNewVehicleBrand(selectedBrand);

    setFormData((prevFormData) => ({
      ...prevFormData,
      marca: selectedBrand === "add" ? "" : selectedBrand,
    }));
    setNewVehicleModel("");
    setSelectedYear("");
    setNewBrand("");

    setIsSelectEnabled(selectedBrand === "add");
    fetchModels(selectedBrand);
  };

  const handleChangeModels = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(inputValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      modelo: inputValue,
    }));
    setNewModel(inputValue);
  };

  const handleModelSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value;
    console.log(selectedModel);

    if (selectedModel === "add") {
      setShowAddModelInput(true);
      setShowAddYearInput(false);
      setNewModel("");
      setSelectedState("");
    } else {
      setShowAddModelInput(false);
      setNewModel(selectedModel);
      setSelectedState("");
    }

    setInventoryModel(selectedModel);
    setNewVehicleModel(selectedModel);

    setSelectedYear("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      modelo: selectedModel === "add" ? "" : selectedModel,
    }));

    setIsAddingModel(selectedModel === "add");
    setIsSelectEnabled(selectedModel === "add");
    // fetchYears(selectedBrand, selectedModel)
    console.log("Selected model:", selectedModel);
    console.log("showAddBrandInput before:", showAddBrandInput);
    console.log("showAddModelInput before:", showAddModelInput);

    // Resto del código...

    console.log("showAddBrandInput after:", showAddBrandInput);
    console.log("showAddModelInput after:", showAddModelInput);
  };

  const handleYearSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    console.log(selectedValue);

    setNewVehicleYear(selectedValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      year: Number(selectedValue),
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedYear = e.target.value;
    console.log(selectedYear);

    setFormData((prevFormData) => ({
      ...prevFormData,
      year: Number(selectedYear),
    }));

    setNewYear(selectedYear);
  };

  const handleStateSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedState(selectedValue);
    console.log(e.target.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      estado: selectedValue,
    }));

    const { name, value } = e.target;

    if (name === "estado") {
      setIsStateValid(value !== "");
    }
  };

  const handleSelectHover = () => {
    setIsSelectHovered(true);
  };

  const handleSelectLeave = () => {
    setIsSelectHovered(false);
  };

  const handleSelectFocus = () => {
    setIsSelectActive(true);
  };

  const handleSelectBlur = () => {
    setIsSelectActive(false);
  };

  // const handleSelectClick = () => {
  //   setIsSelectActive(true);
  //   selectRef.current.focus();
  // };
  const handleChangePresentacion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      presentacion: value,
    }));
  };

  const handleChangePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      precio: Number(value),
    }));
  };

  const handleChangeKilometraje = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      kilometraje: value,
    }));
  };

  const handleChangeCombustible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      combustible: value,
    }));
  };

  const handleChangeImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrl: value.split("\n"),
    }));
  };

  const handleChangeMotor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Motor: value,
      },
    }));
  };
  const handleChangePasajeros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Pasajeros: value,
      },
    }));
  };
  const handleChangePuerta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Puertas: value,
      },
    }));
  };
  const handleChangeCarroceria = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Carroceria: value,
      },
    }));
  };
  const handleChangeTransmision = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Transmision: value,
      },
    }));
  };
  const handleChangeLlantas = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Llantas: value,
      },
    }));
  };
  const handleChangeTraccion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Traccion: value,
      },
    }));
  };
  const handleChangePotencia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Potencia: value,
      },
    }));
  };
  const handleChangeBaul = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        Baul: value,
      },
    }));
  };

  const handleChangeAirbag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormValues) => ({
      ...prevFormValues,
      fichaTecnica: {
        ...prevFormValues.fichaTecnica,
        airbag: value,
      },
    }));
  };

  const handleNewVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    Swal.fire({
      title: "¿Deseas publicar tu auto?",
      text: "Al presionar PUBLICAR se publicará tu auto.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "PUBLICAR",
      cancelButtonText: "CANCELAR",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://localhost:3001/cars",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire({
            title: "Publicación exitosa",
            text: "El auto se ha publicado correctamente.",
            icon: "success",
          });
          console.log(response.data);

          // Limpio los campos después de confirmar
          setNewBrand("");
          setNewModel("");
          setNewYear("");
          setShowAddBrandInput(false);
          setShowAddModelInput(false);
          setShowAddYearInput(false);
          setNewVehicleBrand("");
          setNewVehicleModel("");
          setSelectedState("");
          setFormData({
            marca: "",
            modelo: "",
            presentacion: "",
            precio: 0,
            estado: "",
            year: 0,
            imageUrl: [""],
            kilometraje: 0,
            combustible: "",
            fichaTecnica: {
              Motor: "",
              Pasajeros: "",
              Carroceria: "",
              Transmision: "",
              Traccion: "",
              Llantas: "",
              Potencia: "",
              Puertas: "",
              Baul: "",
              airbag: "",
            },
          });
          console.log("Nueva marca de vehículo:", newVehicleBrand);
          console.log("Nuevo modelo de vehículo:", newVehicleModel);
        } catch (error) {
          Swal.fire({
            title: "Error al publicar el auto",
            text: "Se ah producido un error al enviar los datos del auto.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const handleCancelAddBrand = () => {
    setShowAddBrandInput(false);
    setShowAddModelInput(false);
    setShowAddYearInput(false);
    setNewBrand("");
    setSelectedState("");
    setNewVehicleBrand("");
    // updateCombinedData("", "", "", "", {});
  };

  const handleCancelAddModel = () => {
    setShowAddModelInput(false);
    setShowAddYearInput(false);
    setNewModel("");
    setSelectedState("");
    setNewVehicleModel("");
    // updateCombinedData("", "", "", "", {});
  };

  const handleCancelAddYear = () => {
    setShowAddYearInput(false);
    setNewYear("");
    setSelectedState("");
    setNewVehicleYear("");
    setFormData((prevData) => ({
      ...prevData,
      year: 0,
    }));
  };

  const handleInventorySubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   console.log(e.target);
    //   // const jsonData = JSON.stringify(combinedData);
    //   // axios
    //   //   .post("http://localhost:3001/cars?stock=value", jsonData, {
    //   //     headers: {
    //   //       "Content-Type": "application/json",
    //   //     },
    //   //   })
    //   //   .then((response) => {
    //   //     console.log(response.data);
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error(error);
    //   //   });
    //   // Envío el formulario de "Añadir al inventario"
    //   console.log("Marca seleccionada para el inventario:", inventoryBrand);
    //   console.log("Modelo seleccionado para el inventario:", inventoryModel);
  };

  // const handleNewVehicleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(e.target);

  //   const jsonData = JSON.stringify(formData);
  //   console.log(jsonData);
  //   axios
  //     .post("http://localhost:3001/cars", jsonData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   // Envio el formulario de "Añadir un nuevo vehículo"
  //   setNewBrand("");
  //   setNewModel("");
  //   setNewYear("");
  //   setShowAddBrandInput(false);
  //   setShowAddModelInput(false);
  //   setShowAddYearInput(false);
  //   setNewVehicleBrand("");
  //   setNewVehicleModel("");
  //   setSelectedState("");
  //   setFormData({
  //     marca: "",
  //     modelo: "",
  //     presentacion: "",
  //     precio: 0,
  //     estado: "",
  //     year: 0,
  //     imageUrl: [""],
  //     kilometraje: 0,
  //     combustible: "",
  //     fichaTecnica: {
  //       Motor: "",
  //       Pasajeros: "",
  //       Carroceria: "",
  //       Transmision: "",
  //       Traccion: "",
  //       Llantas: "",
  //       Potencia: "",
  //       Puertas: "",
  //       Baul: "",
  //       airbag: "",
  //     },
  //   });
  //   console.log("Nueva marca de vehículo:", newVehicleBrand);
  //   console.log("Nuevo modelo de vehículo:", newVehicleModel);
  // };

  return (
    <div className="mt-16 min-w-full flex-col items-center bg-slate-50 text-gray-600 body-font h730:mt-144 h742:mt-120 h935:mt-100 hdm:mt-20 lg:mt-16 xl:mt-16 2xl:mt-16">
      <div className="p-4 flex justify-center">
        <button
          disabled={activeTab === "stock"}
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
            handleCancelAddBrand();
            handleCancelAddModel();
            handleCancelAddYear();
          }}
          disabled={activeTab === "addVehicle"}
        >
          Publica un Nuevo Vehículo
        </button>

        <button
          className={
            "ml-4 py-2 px-4 bg-gray-500 text-gray-200  hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200  rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#ff7300]"
          }
          onClick={() => {
            // Restablecer la variable de estado del formulario "Añadir un nuevo vehículo" al cambiar de pestaña
            setSelectedState("");
            setInventoryBrand("");
            setInventoryModelList([]);
            setNewVehicleBrand("");
            setNewVehicleModelList([]);
            handleCancelAddBrand();
            handleCancelAddModel();
            handleCancelAddYear();
          }}
        >
          RELOAD
        </button>
      </div>

      {/* --------------------------------------------------------------------------------------------------------- */}

      <div className="mt-4">
        {activeTab === "stock" && (
          <form
            onSubmit={handleInventorySubmit}
            className="flex flex-row m-auto w-fit"
          >
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 text-center">
                AÑADE AL INVENTARIO
              </h2>

              <div className="flex flex-row m-auto w-fit">
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

                    {Array.isArray(brandList) && brandList.length > 0 ? (
                      brandList.map((marca) => (
                        <option key={marca.id} value={marca.name}>
                          {marca.name}
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

                {showAddModelInput ? (
                  <div className="flex flex-row items-center">
                    <input
                      type="number"
                      min={0}
                      value={newYear}
                      onChange={handleYearChange}
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
                ) : (
                  <div className="w-fit">
                    <select
                      className="border border-gray-300 rounded w-fit px-4 py-2 my-4 mx-2"
                      value={selectedYear}
                      onChange={(e) => {
                        if (e.target.value === "add") {
                          setShowAddModelInput(true);
                        } else {
                          handleYearSelection(e);
                        }
                      }}
                      disabled={
                        !inventoryBrand || !inventoryModel || isAddingBrand
                      }
                    >
                      <option className="m-1 " value="">
                        Selecciona el Año
                      </option>

                      {Array.isArray(formData) &&
                        formData.map((element, index) => (
                          <option key={index} value={element.year}>
                            {element.year}
                          </option>
                        ))}

                      <option className="text-blue-500" value="add">
                        Agregar Año
                      </option>
                    </select>
                  </div>
                )}
                <div>
                  <select
                    value={selectedState}
                    onChange={handleStateSelection}
                    disabled={
                      !inventoryBrand || !inventoryModel || isAddingBrand
                    }
                    className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                  >
                    <option value="">Estado</option>
                    {brandList ? (
                      <>
                        <option className="m-1" value="Nuevo">
                          🟢 Nuevo
                        </option>
                        <option className="m-1" value="Usado">
                          🟠 Usado
                        </option>
                      </>
                    ) : null}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700]"
                >
                  AÑADIR VEHICULO
                </button>
              </div>
            </div>
          </form>
        )}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        {activeTab === "addVehicle" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">PUBLICA TU AUTO</h2>
            <form
              onSubmit={handleNewVehicleSubmit}
              className="flex flex-row m-auto w-fit"
            >
              <div className="flex flex-col items-center">
                <div className="">
                  <div className="flex flex-row m-auto w-fit">
                    {showAddBrandInput ? (
                      <div className="flex flex-row items-center relative">
                        <input
                          type="text"
                          value={newBrand}
                          onChange={handleChangeBrands}
                          placeholder="Nueva Marca"
                          onFocus={() => setIsBrandFocused(true)}
                          onBlur={() => setIsBrandFocused(false)}
                          className={`relative  border border-gray-300 rounded-s-lg px-4 py-2 my-4  ${
                            !isBrandValid && !isBrandFocused
                              ? "border-red-500"
                              : isBrandValid && !isBrandFocused
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {!isBrandValid && isBrandFocused && (
                          <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-1.4rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm">
                            Por favor, ingresa una marca válida (mínimo 2
                            caracteres, no puede contener números y no puede ser
                            solo "-").
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={handleCancelAddBrand}
                          className="w-8 h-[42px] py-2 mr-4 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
                        >
                          <span className="text-xl font-bold">X</span>
                        </button>
                      </div>
                    ) : (
                      <select
                        value={newVehicleBrand}
                        onChange={handleBrandSelection}
                        className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
                        disabled={showAddBrandInput}
                      >
                        <option disabled value="">
                          Selecciona una marca
                        </option>
                        {Array.isArray(brandList) && brandList.length > 0 ? (
                          brandList.map((marca) => (
                            <option key={marca.id} value={marca.name}>
                              {marca.name}
                            </option>
                          ))
                        ) : (
                          <option disabled className="text-green-500">
                            Cargando marcas...
                          </option>
                        )}
                        <option className="text-blue-500" value="add">
                          Agregar Marca
                        </option>
                      </select>
                    )}

                    {showAddModelInput ? (
                      <div className="flex flex-row items-center relative">
                        <input
                          type="text"
                          value={newModel}
                          onChange={handleChangeModels}
                          placeholder="Nuevo Modelo"
                          onFocus={() => setIsCarModelFocused(true)}
                          onBlur={() => setIsCarModelFocused(false)}
                          className={`relative  border border-gray-300 rounded-s-lg px-4 py-2 my-4  ${
                            !isCarModelValid && !isCarModelFocused
                              ? "border-red-500"
                              : isCarModelValid && !isCarModelFocused
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {!isCarModelValid && isCarModelFocused && (
                          <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-1.4rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm">
                            Por favor, ingresa un modelo de carro válido (minimo
                            2 caracteres y máximo 20 caracteres, letras,
                            números, puntos y guiones).
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={handleCancelAddModel}
                          className="w-8 h-[42px] py-2 mr-2 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
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

                    {showAddModelInput || showAddYearInput ? (
                      <div className="flex flex-row items-center relative">
                        <input
                          type="number"
                          value={newYear}
                          onChange={handleYearChange}
                          placeholder="Año del vehículo"
                          onFocus={() => setIsYearFocused(true)}
                          onBlur={() => setIsYearFocused(false)}
                          className={`relative  border border-gray-300 rounded-s-lg px-4 py-2 my-4  ${
                            !isYearValid && !isYearFocused
                              ? "border-red-500"
                              : isYearValid && !isYearFocused
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {!isYearValid && isYearFocused && (
                          <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-1.4rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm z-10">
                            Por favor, ingresa un año válido.
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={handleCancelAddYear}
                          className="w-8 h-[42px] py-2 mr-2 bg-gray-300 border border-gray-300 text-white rounded-e-lg flex items-center justify-center transition duration-300 hover:bg-red-500"
                        >
                          <span className="text-xl font-bold">X</span>
                        </button>
                      </div>
                    ) : (
                      <select
                        className="border border-gray-300 rounded w-fit px-4 py-2 my-4 mx-2"
                        value={newVehicleYear}
                        onChange={(e) => {
                          if (e.target.value === "add") {
                            setShowAddYearInput(true);
                          } else {
                            handleYearSelection(e);
                          }
                        }}
                        disabled={!newVehicleModel || isAddingBrand}
                      >
                        <option className="m-1 " value="">
                          Selecciona el Año
                        </option>
                        {Array.isArray(formData) &&
                          formData.map((element, index) => (
                            <option key={index} value={element.year}>
                              {element.year}
                            </option>
                          ))}
                        <option className="text-blue-500" value="add">
                          Agregar Año
                        </option>
                      </select>
                    )}

                    <div className="relative">
                      <select
                        value={selectedState}
                        onChange={handleStateSelection}
                        disabled={
                          !newVehicleBrand || !newVehicleModel || isAddingBrand
                        }
                        className={`border rounded px-4 py-2 my-4 mx-2 ${
                          selectedState === "Usado" || selectedState === "Nuevo"
                            ? "border-green-500"
                            : selectedState === "add"
                            ? "border-s-gray-500"
                            : "border-red-500"
                        }`}
                        onMouseEnter={handleSelectHover}
                        onMouseLeave={handleSelectLeave}
                        onFocus={handleSelectFocus}
                        onBlur={handleSelectBlur}
                      >
                        <option value="">Estado</option>
                        {brandList ? (
                          <>
                            <option className="m-1" value="Nuevo">
                              🟢 Nuevo
                            </option>
                            <option className="m-1" value="Usado">
                              🟠 Usado
                            </option>
                          </>
                        ) : null}
                      </select>
                      {isSelectHovered && !selectedState && !isSelectActive && (
                        <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-1.4rem] px-2 py-1 m-2 bg-red-500/90 text-white text-sm z-10">
                          Por favor, selecciona un estado válido.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    {newVehicleBrand && newVehicleModel && (
                      <div className="flex flex-row items-center justify-center">
                        <div className="w-200 p-8 bg-white rounded shadow-lg flex-grow flex-shrink">
                          <h2 className="text-2xl text-center font-bold mb-4">
                            INFORMACIÓN
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mt-2 mx-2 relative">
                              <label htmlFor="presentacion">
                                Presentación:
                              </label>
                              <input
                                type="text"
                                id="presentacion"
                                name={formData.presentacion}
                                onChange={handleChangePresentacion}
                                placeholder="Presentación"
                                onFocus={() => setIsPresentacionFocused(true)}
                                onBlur={() => setIsPresentacionFocused(false)}
                                // className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2"
                                className={`relative border border-gray-300 rounded  px-4 py-2 mt-1 mb-2  ${
                                  !isPresentacionValid && !isPresentacionFocused
                                    ? "border-red-500"
                                    : isPresentacionValid &&
                                      !isPresentacionFocused
                                    ? "border-green-500"
                                    : ""
                                }`}
                              />
                              {!isPresentacionValid &&
                                isPresentacionFocused && (
                                  <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-0.8rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm z-10">
                                    Por favor, ingresa una presentación válida
                                    (mínimo 5 caracteres y máximo 30 caracteres,
                                    solo letras, "-", y ".")
                                  </div>
                                )}
                            </div>
                            <div className="flex flex-col mt-2 mx-2 relative">
                              <label htmlFor="precio">Precio:</label>
                              <input
                                type="number"
                                min={0}
                                id="precio"
                                name={formData.precio.toString()}
                                onChange={handleChangePrecio}
                                onFocus={() => setIsPrecioFocused(true)}
                                onBlur={() => setIsPrecioFocused(false)}
                                placeholder="0"
                                className={`relative border border-gray-300 rounded  px-4 py-2 mt-1 mb-2  ${
                                  !isPrecioValid && !isPrecioFocused
                                    ? "border-red-500"
                                    : isPrecioValid && !isPrecioFocused
                                    ? "border-green-500"
                                    : ""
                                }`}
                              />
                              {!isPrecioValid && isPrecioFocused && (
                                <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-0.8rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm z-10">
                                  Por favor, ingresa un precio válido (mínimo 4
                                  caracteres y máximo 6 caracteres, solo
                                  números).
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col mt-2 mx-2 relative">
                              <label htmlFor="kilometraje">Kilometraje:</label>
                              <input
                                type="number"
                                id="kilometraje"
                                name={formData.kilometraje.toString()}
                                onChange={handleChangeKilometraje}
                                onFocus={() => setIsKilometrajeFocused(true)}
                                onBlur={() => setIsKilometrajeFocused(false)}
                                placeholder="0"
                                className={`relative border border-gray-300 rounded  px-4 py-2 mt-1 mb-2  ${
                                  !isKilometrajeValid && !isKilometrajeFocused
                                    ? "border-red-500"
                                    : isKilometrajeValid &&
                                      !isKilometrajeFocused
                                    ? "border-green-500"
                                    : ""
                                }`}
                              />
                              {!isKilometrajeValid && isKilometrajeFocused && (
                                <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-0.8rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm z-10">
                                  Por favor, ingresa un kilometraje válido
                                  (mínimo 0K y máximo 999999K dígitos
                                  numéricos).
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col mt-2 mx-2 relative">
                              <label htmlFor="combustible">Combustible:</label>
                              <input
                                type="text"
                                id="combustible"
                                name={formData.combustible}
                                onChange={handleChangeCombustible}
                                onFocus={() => setIsCombustibleFocused(true)}
                                onBlur={() => setIsCombustibleFocused(false)}
                                placeholder="Combustible"
                                className={`relative border border-gray-300 rounded  px-4 py-2 mt-1 mb-2  ${
                                  !isCombustibleValid && !isCombustibleFocused
                                    ? "border-red-500"
                                    : isCombustibleValid &&
                                      !isCombustibleFocused
                                    ? "border-green-500"
                                    : ""
                                }`}
                              />
                              {!isCombustibleValid && isCombustibleFocused && (
                                <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-0.8rem] px-2 py-1 mr-2 bg-red-500/90 text-white text-sm z-10">
                                  Por favor, selecciona un tipo de combustible
                                  válido (gasolina, gasoil o electrica)
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="max-w-[300px] min-w-[300px] max-h-[300px] min-h-[300px] ml-2 p-2 bg-white rounded shadow-lg flex-grow flex-shrink relative">
                          <h2 className="text-2xl text-center font-bold mb-1">
                            IMAGEN
                          </h2>
                          <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl.join("\n")}
                            onChange={handleChangeImagen}
                            onFocus={() => setIsImageUrlFocused(true)}
                            onBlur={() => setIsImageUrlFocused(false)}
                            className={`relative border border-gray-300 rounded w-full px-4 py-2 mt-1 mb-2  ${
                              !isImageUrlValid && !isImageUrlFocused
                                ? "border-red-500"
                                : isImageUrlValid && !isImageUrlFocused
                                ? "border-green-500"
                                : ""
                            }`}
                          />
                          {!isImageUrlValid && isImageUrlFocused && (
                            <div className="absolute rounded-sm top-[calc(100%+0.5rem)] left-0 mt-[-13.5rem] px-2 py-1 mx-2 bg-red-500/90 text-white text-sm z-10">
                              Por favor, ingresa una URL válida de una imagen
                              (formatos compatibles: gif, jpeg, jpg, tiff, png,
                              webp, bmp).
                            </div>
                          )}
                          {isImageUrlValid && formData.imageUrl && (
                            <div className="max-w-full max-h-[200px] rounded-sm shadow-lg flex-grow flex-shrink">
                              {formData.imageUrl.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={image}
                                  className="w-full max-h-[195px] object-cover rounded-sm"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8 w-full">
                    {newVehicleBrand && newVehicleModel && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-200 p-8 bg-white rounded shadow-lg flex-grow flex-shrink">
                          <h2 className="text-2xl text-center font-bold mb-4">
                            FICHA TÉCNICA
                          </h2>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="motor">Motor:</label>
                              <input
                                type="text"
                                id="motor"
                                name={formData.fichaTecnica.Motor.toString()}
                                onChange={handleChangeMotor}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="pasajeros" className="form-label">
                                Pasajeros:
                              </label>
                              <input
                                type="number"
                                min={0}
                                id="pasajeros"
                                name={formData.fichaTecnica.Pasajeros.toString()}
                                onChange={handleChangePasajeros}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="carroceria">Carrocería:</label>
                              <input
                                type="text"
                                id="carroceria"
                                name={formData.fichaTecnica.Carroceria.toString()}
                                onChange={handleChangeCarroceria}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="transmision">Transmisión:</label>
                              <input
                                type="text"
                                id="transmision"
                                name={formData.fichaTecnica.Transmision.toString()}
                                onChange={handleChangeTransmision}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="traccion">Tracción:</label>
                              <input
                                type="text"
                                id="traccion"
                                name={formData.fichaTecnica.Traccion.toString()}
                                onChange={handleChangeTraccion}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="llantas">Llantas:</label>
                              <input
                                type="number"
                                min={0}
                                id="llantas"
                                name={formData.fichaTecnica.Llantas.toString()}
                                onChange={handleChangeLlantas}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="potencia">Potencia:</label>
                              <input
                                type="number"
                                min={0}
                                id="potencia"
                                name={formData.fichaTecnica.Potencia.toString()}
                                onChange={handleChangePotencia}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="puertas">Puertas:</label>
                              <input
                                type="number"
                                min={0}
                                id="puertas"
                                name={formData.fichaTecnica.Puertas.toString()}
                                onChange={handleChangePuerta}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="baul">Baúl:</label>
                              <input
                                type="number"
                                min={0}
                                id="baul"
                                name={formData.fichaTecnica.Baul.toString()}
                                onChange={handleChangeBaul}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="flex flex-col mt-2 mx-2">
                              <label htmlFor="airbag">Airbag:</label>
                              <input
                                type="number"
                                min={0}
                                id="airbag"
                                name={formData.fichaTecnica.airbag.toString()}
                                onChange={handleChangeAirbag}
                                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    // className="bg-blue-500 text-white py-2 px-4 mb-10 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700]"
                    type="submit"
                    disabled={!isButtonActive}
                    className={`py-2 px-4 rounded ${
                      isButtonActive
                        ? "bg-blue-500 text-white animate-pulse-gradient px-4 mb-8 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700] "
                        : "bg-gray-400 text-white  px-4 mb-8 rounded-lg transition duration-300 shadow-[#555555]cursor-not-allowed"
                    }`}
                  >
                    PUBLISH
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCars;
