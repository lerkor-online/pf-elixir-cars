"use client"

import { useEffect, useState, useRef } from 'react';

interface CarType {
  id: number;
  presentacion: string;
  brand: string;
  imageUrl: string; // Asegúrate de agregar esta propiedad a la interfaz
  // Otras propiedades...
}

const ButtonCart = () => {
  const [carrito, setCarrito] = useState<CarType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lengthCart, set_lengthCart] = useState(0);
  const cartRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
    const _lengthCart = JSON.parse(localStorage.getItem('carrito_length')) || 0;
    set_lengthCart(_lengthCart)
  }, []);
    
    const handleOpenCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleQuitItem = (carIdToDelete: number) => {
    console.log("Auto Eliminado Id" + carIdToDelete)

    // Retrieve the current cart items from the local storage
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Filter out the item with the matching id from the cart items
    const updatedCarrito = storedCarrito.filter((car: CarType) => car.id !== carIdToDelete);
  
    // Update the cart state with the filtered cart items
    setCarrito(updatedCarrito);
  
    // Store the updated cart items back to the local storage
    localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
 };


  return (
    <div className="relative text-white justify-center mr-10">
      <div onClick={handleOpenCart}>
        {console.log(lengthCart)}
        <a href="">🛒({lengthCart})</a>
      </div>
      {isCartOpen && (
        <div className="absolute right-0 top-8 border border-black text-black bg-white p-4" ref={cartRef}>
          {carrito.length > 0 ? (
            carrito.map((car) => (
                <div key={car.id} className="flex flex-row items-center m-4 w-max">
                <img
                  src={car.imageUrl}
                  alt="Car Img"
                  width={100}
                  height={100}
                  priority
                />
                <p className="m-2 font-bold">{car.brand.name}</p>
                <p className="m-2 whitespace-nowrap">{car.presentacion}</p>
                <p className="m-2 font-bold">U$D {car.precio}</p>
                <button className='m-2 py-1 px-2 bg-red-700 rounded-md font-bold' onClick={()=>handleQuitItem(car.id)}>X</button>
              </div>
            ))
          ) : (
            <p>El carrito está vacío.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonCart;