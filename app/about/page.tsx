import React from "react";

export default function page() {
  return (
    <div className=" h-max w-full bg-gray-50 overflow-hidden">
      <div className="mockup-window bg-base-300 -mx-4">
        <div className="flex justify-center px-4 py-8 bg-base-200 flex-col ">
          <section className="text-gray-600 body-font ">
            <div className="flex flex-col w-full items-center justify-center mb-4 ">
              <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-gray-900">
                ABOUT US
              </h1>
            </div>
          </section>

          <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 ">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <h2 className="text-2x1 title-font text-gray-500 tracking-widest">
                MISSION
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Our reason for being
              </h1>
              <p className=" text-gray-900 text-1xl title-font text-justify mb-4">
                Our vision goes beyond a simple internet page, it is rather a
                solution so that each of the users obtains what they require,
                truthful information, products and services that meet their
                needs and expanded with the latest technology trends. applied to
                the internet.
              </p>
              <p className=" text-gray-900 text-1xl title-font text-justify mb-4">
                Our mission is to offer creative digital solutions, functional
                and convenient for our clients through the design of web pages.
              </p>
              <p>
                At Elixir Cars we are committed to offering our clients the best
                service.
              </p>
              <div className="mt-4 md:mt-8">
                <a
                  href="/login"
                  className="flex mx-auto mt-16 w-fit justify-starts title-font font-medium text-lg text-white bg-blue-500 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] border-0 py-2 px-8 focus:outline-none hover:bg-[#FFD700] hover:text-gray-800 "
                >
                  <button>Get Started Today</button>
                </a>
              </div>
            </div>

            <img
              alt="mission"
              src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2020/11/volkswagen-tiguan-r-2021-2148219.jpg"
              className="h-56 w-full object-cover sm:h-full rounded-lg"
            />
          </section>
          <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 mt-4">
            <img
              alt="Student"
              src="https://www.autosur.mx/resourcefiles/inner-page-overview-with-image/quienes-somos.png"
              className="h-56 w-full object-cover sm:h-full rounded-lg"
            />
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <h2 className="text-2x1 title-font text-gray-500 tracking-widest">
                VISION
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Where are we going
              </h1>
              <p className=" text-gray-900 text-1xl title-font text-justify mb-4">
                Our vision is to be a leading agency in quality and service.
              </p>
              <p className=" text-gray-900 text-1xl title-font text-justify mb-4">
                We believe that with the constant advancement of technologies,
                it is important to continue offering our clients modern and
                trendy digital solutions through our professional services.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
