import Image from "next/image";
import arrayCars from "@/carsapi.json";

interface ParamsType {
  params: string;
}

const car = arrayCars[2];

const fetchCarDetail = (id: number) => {
  return fetch(`http://localhost:3001/cars/${id}`, {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
};

export default async function CarDetail({ params }: ParamsType) {
  const { id }: any = params;
  console.log(id);

  const car = await fetchCarDetail(id);
  return (
    <div>
      <header className="h-20"></header>
      <section className="w-9/12 mx-auto">
        <div className="grid grid-cols-2 items-center m-8">
          <div className="flex justify-center ">
            <img
              src={car.imageUrl}
              alt="Elixir Logo"
              className=" rounded-3xl shadow-2xl"
              width={400}
              height={400}
              priority
            />
          </div>
          <div>
            <h1 className="font-bold font-MiAvenirRegular text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
              {car.brand.name}
            </h1>
            <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
              {car.presentacion}
            </span>
            <p className="text-xs font-bold uppercase tracking-wide mt-4 mb-0">
              Precio
            </p>
            <p className="text-3xl font-bold">U$D {car.precio}</p>
            <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
              <span className="mr-6">Compartir</span>
              <div className="flex flex-row">
                <Image
                  src="/SocialIcons/facebook.png"
                  alt="facebook.png"
                  width={15}
                  height={13}
                  priority
                  className="mx-4 cursor-pointer backdrop-brightness-2xl"
                />
                <Image
                  src="/SocialIcons/twitter.png"
                  alt="twitter.png"
                  width={15}
                  height={13}
                  priority
                  className="mx-4 cursor-pointer"
                />
                <Image
                  src="/SocialIcons/whatsapp.png"
                  alt="whatsapp.png"
                  width={15}
                  height={15}
                  priority
                  className="mx-4 cursor-pointer"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
            </div>
            <div></div>
            <button className="bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 w-28 rounded-md hover:bg-gradient-to-r from-yellow-800 to-yellow-500 shadow-2xl">
              Comprar
            </button>
            <div className="mt-3 text-sm text-gray-600">
              Foto no contractual, el precio y equipamiento podrán variar sin
              previo aviso. No incluye gastos de flete y patentamiento.
            </div>
          </div>
        </div>
      </section>
      <h2 className="text-4xl font-semibold p-4 text-center">
        Caracteristicas Principales
      </h2>
      <section className="grid grid-cols-5 w-auto p-12">
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-engine.png"
              alt="car-engine.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.motor}
          </p>
          <p>Motor</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-passenger.png"
              alt="car-passenger.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.pasajeros}
          </p>
          <p>Pasajeros</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-hatch.png"
              alt="car-hatch.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.carroceria}
          </p>
          <p>Carrocería</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-transmission.png"
              alt="car-transmission.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.transmision}
          </p>
          <p>Transmisión</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-traction.png"
              alt="car-traction.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.traccion}
          </p>
          <p>Tracción</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-tires.png"
              alt="car-tires.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.llantas}
          </p>
          <p>Llantas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-power.png"
              alt="car-power.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.potencia}
          </p>
          <p>Potencia</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-key.png"
              alt="car-key.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.puertas}
          </p>
          <p>Puertas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-trunk.png"
              alt="car-trunk.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.baul}
          </p>
          <p>Baúl</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <Image
              src="/IconsDetail/car-airbag.png"
              alt="car-airbag.png"
              width={50}
              height={50}
              priority
            />
            {car.fichaTecnica?.Airbag}
          </p>
          <p>Airbags</p>
        </div>
      </section>
    </div>
  );
}
