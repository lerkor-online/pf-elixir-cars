const Newsletter = () => {
  return (
    <div className="container  mx-auto md:px-6">
      <section>
        <div className=" rounded-lg  relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://images.wallpaperscraft.com/image/single/bmw_headlights_car_124112_1280x720.jpg')] h-[250px]"></div>
        <div className="container px-2 md:px-12">
          <div className="block rounded-lg bg-[#ffffffc9] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.00)] dark:bg-[hsla(0,0%,5%,0)] dark:shadow-black/20 md:py-16 md:px-12 mt-[-100px] backdrop-blur-[30px]">
            <div className="flex flex-wrap justify-center text-center lg:text-left">
              <div className="w-full shrink-0 grow-0 basis-auto md:px-6 xl:w-10/12">
                <div className="grid items-center gap-x-6 lg:grid-cols-2">
                  <div className="mb-10 lg:mb-0 text-white">
                    <h2 className="text-2xl font-bold">
                      No te pierdas de nuestras novedades.
                      <br />
                      <span className="text-primary dark:text-primary-400">
                        Subscribete a nuestro diario!
                      </span>
                    </h2>
                  </div>

                  <div className="mb-6 flex-row md:mb-0 md:flex">
                    <div
                      className="relative mb-3 w-full md:mr-3 md:mb-0"
                      data-te-input-wrapper-init
                    >
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg py-[0.32rem] px-3 leading-[2.15] outline-none  dark:peer-focus:text-primary placeholder:text-slate-950"
                        id="exampleFormControlInput2"
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      type="submit"
                      className=" bg-slate-900 inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
