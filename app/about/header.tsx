import React from "react";
import logo from "../../public/Image/logo_elixir_cars.png";
import Image from "next/image";

function Header() {
  return (
    <header className="flex bg-slate-50 text-gray-600 body-font h730:mt-144 h742:mt-120 h935:mt-100 hdm:mt-20 lg:mt-16 xl:mt-16 2xl:mt-16">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Image
          src={logo}
          width={"200"}
          height={"100"}
          className=" text-white "
          alt="logo"
        />

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a
            href="/about"
            className="mr-5 hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200 p-2 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          >
            About Us
          </a>
          <a
            href="/about/contact"
            className="mr-5 hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200 p-2 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          >
            Contact Us
          </a>
          <a
            href="/about/ourteam"
            className="mr-5 hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200 p-2 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          >
            Our Team
          </a>
          <a
            href="/about/faqs"
            className="mr-5 hover:text-gray-900 hover:cursor-pointer h-fit flex border-gray-200 p-2 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]"
          >
            FAQ's
          </a>
        </nav>
        <a href="/home">
          <button className="inline-flex items-center bg-gray-100 border py-1 px-3 transition duration-300 focus:outline-none hover:shadow-md shadow-[#555555]  hover:bg-blue-500 hover:text-white rounded text-base mt-4 md:mt-0">
            HOME
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
