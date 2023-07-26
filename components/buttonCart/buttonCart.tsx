"use client"

import { useState, useEffect } from 'react';

interface CarType {
  // Define el tipo para los datos del coche
  // Ajusta las propiedades según la estructura de tu coche
  id: number;
  name: string;
  brand: string;
  // Otras propiedades...
}

interface ButtonAddCartProps {
  car: CarType;
}

const ButtonAddCart: React.FC<ButtonAddCartProps> = ({ car }) => {
  const [carrito, setCarrito] = useState<CarType[]>([]);

  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
  }, []);

  const isCarInCart = (carId: number) => {
    return carrito.some((item) => item.id === carId);
  };

  const handleCartItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isCarInCart(car.id)) {
      const updatedCarrito = [...carrito, car];
      setCarrito(updatedCarrito);
      localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
      console.log(updatedCarrito)
      localStorage.setItem('carrito_length', JSON.stringify(updatedCarrito.length))
      const _lengthCart = JSON.parse(localStorage.getItem('carrito_length')) || 0
      console.log(_lengthCart)
      alert('Su Item fue agregado al carrito');
    } else {
        alert('El coche ya está en el carrito');
    }
};


  return (
    <button
      className='bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 w-auto rounded-md hover:bg-gradient-to-r from-yellow-800 to-yellow-500 shadow-2xl'
      onClick={handleCartItem}
    >
      Add to Cart
    </button>
  );
};

export default ButtonAddCart;