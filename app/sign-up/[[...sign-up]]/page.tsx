"use client";
import { SignUp } from "@clerk/nextjs";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Page() {
  const route = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const turnBack = (e: any) => {
    e.preventDefault();
    route.push("/");
  };

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onRegister = async (e: Event) => {
    e.preventDefault();

    const response = await axios.post(
      "https://pf-elixir-cars-back-production.up.railway.app/register",
      user
    );

    const responseLogin = await axios.post(
      "https://pf-elixir-cars-back-production.up.railway.app/login",
      user
    );

    const data = await responseLogin.data;
    if (data) {
      console.log("entre!");
      localStorage.setItem("userToken", data.token);
      Cookies.set("cookiesToken", data.token);
    } else {
    }
    route.push("/home");
  };

  return (
    <section className="h-full bg-slate-500 grid place-content-center">
      <div className="z-10  rounded-lg bg-[rgb(235,171,43)]  p-10 m-6  ">
        <form className="flex text-center">
          <section className="flex flex-col gap-5 p-3 ">
            <h1 className="mb-3 text-2xl font-bold">Crea una cuenta</h1>
            <section className="flex max-lg:flex-col justify-between ">
              <label className="text-lg font-semibold" htmlFor="">
                Nombre:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.name}
                name="name"
                placeholder="elixir cars"
                className="p-1 outline-none text-center rounded-lg"
                type="text"
              />
            </section>
            <section className="flex max-lg:flex-col justify-between ">
              <label className="text-lg font-semibold" htmlFor="">
                Email:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.email}
                name="email"
                placeholder="example@gmail.com"
                className="p-1 text-center outline-none rounded-lg"
                type="text"
              />
            </section>
            <section className="flex max-lg:flex-col justify-between gap-2 ">
              <label className="text-lg font-semibold" htmlFor="">
                Contraseña:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.password}
                name="password"
                placeholder="********"
                className="p-1 text-center outline-none rounded-lg"
                type="text"
              />
            </section>
            <section className="">
              <section className="flex justify-center gap-2">
                <button
                  onClick={onRegister}
                  className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                >
                  Registrarse
                </button>
                {/* <button
                  onClick={onClose}
                  className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button> */}
              </section>
              <h1>Continuar con:</h1>
              <SignUp
                afterSignUpUrl={"/home"}
                appearance={{
                  elements: {
                    header: "hidden",
                  },
                }}
              />
            </section>
            <section>
              <button
                onClick={turnBack}
                className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
              >
                Volver
              </button>
            </section>
          </section>
        </form>
      </div>
    </section>
  );
}
