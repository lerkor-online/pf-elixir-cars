import Image from "next/image";
import Boxgold from "../boxgold/boxgold";
import { UserButton } from "@clerk/nextjs";
export default function Nav() {
  return (
    <main>
      <header
        id="landing-header"
        className="py-4  px-10 flex item-center fixed top-0 w-full justify-between bg-neutral-900 border-b-[3px] border-yellow-600 z-40 "
      >
        <div>
          <Image
            src="/logo_elixir_cars.png"
            alt="Elixir Logo"
            className="dark:invert"
            width={160}
            height={56}
            priority
          />
        </div>

        <nav className="flex flex-grow justify-center">
          <ul className="flex text-sm [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:text-gray-50">
            <li>
              <a href="">Usados Garantizados</a>
            </li>
            <li>
              <a href="/categoria-producto/0km">0 KM</a>
            </li>
            <li>
              <a href="">Vende tu Auto</a>
            </li>
            <li>
              <a href="/create">Añadir Auto</a>
            </li>
            <li>
              <a href="">Servicios</a>
            </li>
            <li>
              <a href="/about">Nosotros</a>
            </li>
            <li>
              <a href="">Reviews</a>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex flex-grow [&>li>a]:text-gray-50">
            <li>
              <a href="">Aqui va el carrito de compras</a>
            </li>
          </ul>
        </nav>
        <div className="px-1">
          <UserButton afterSignOutUrl="/" />
        </div>
        <Boxgold />
      </header>
    </main>
  );
}
