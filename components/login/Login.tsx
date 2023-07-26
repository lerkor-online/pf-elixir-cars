import React from "react";
import { SignIn } from "@clerk/nextjs";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface login {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<login> = ({ setShowLogin }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const onClose = (e: any) => {
    e.preventDefault();
    setShowLogin(false);
  };

  const inputChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const logHandler = async (e: Event) => {
    e.preventDefault();
    const response = await axios.post(
      "https://pf-elixir-cars-back-production.up.railway.app/login",
      user
    );

    const data = await response.data;
    if (data) {
      console.log("entre!");
      localStorage.setItem("userToken", data.token);
      Cookies.set("cookiesToken", data.token);
    } else {
    }
    router.push("/home");
  };

  return (
    <>
      <div className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed z-10">
        <div
          onClick={onClose}
          className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
        ></div>
        <div className="z-10  rounded-lg bg-[rgb(235,171,43)]  p-10   ">
          <form className="flex text-center">
            <section className="flex flex-col gap-5 p-3 ">
              <section className="flex max-lg:flex-col justify-between ">
                <label className="text-lg font-semibold" htmlFor="">
                  Email:{" "}
                </label>
                <input
                  name="email"
                  placeholder="elixir cars"
                  className="p-1 outline-none text-center rounded-lg"
                  type="text"
                  value={user.email}
                  onChange={inputChangeHandler}
                />
              </section>
              <section className="flex max-lg:flex-col justify-between gap-2 ">
                <label className="text-lg font-semibold" htmlFor="">
                  Contraseña:{" "}
                </label>
                <input
                  onChange={inputChangeHandler}
                  name="password"
                  value={user.password}
                  placeholder="********"
                  className="p-1 text-center outline-none rounded-lg"
                  type="text"
                />
              </section>
              <section className="">
                <section className="flex justify-center gap-2">
                  <button
                    onClick={logHandler}
                    className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Ingresar
                  </button>
                  {/* <button
                    onClick={onClose}
                    className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button> */}
                </section>
                <h1>Continuar con:</h1>
                <SignIn
                  afterSignInUrl="/home"
                  appearance={{
                    elements: {
                      header: "hidden",
                    },
                  }}
                />
              </section>
            </section>
          </form>
          {err && <p>{err}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
