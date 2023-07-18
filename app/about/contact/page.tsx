import React from "react";

function Contact() {
  return (
    <section className="text-gray-600 body-font relative bg-slate-50 h-full">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please contact us for any additional information you may need.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label id="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#FFD700] focus:bg-white focus:ring-2 focus:ring-[#ffd9005c] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label id="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#FFD700] focus:bg-white focus:ring-2 focus:ring-[#ffd9005c] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label id="message" className="leading-7 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300focus:border-[#FFD700] focus:bg-white focus:ring-2 focus:ring-[#ffd9005c] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full pb-24">
              <button className="flex mx-auto mt-8 w-fit justify-starts title-font font-medium text-lg text-white bg-blue-500 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] border-0 py-2 px-8 focus:outline-none hover:bg-[#FFD700] hover:text-gray-800 ">
                Send
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center ">
              <a className="text-indigo-500 cursor-pointer hover:text-red-500">
                elixircars@gmail.com
              </a>
              <p className="leading-normal my-5">
                Ubicación de Elixir Cars
                <br />
                Ciudad, País
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
