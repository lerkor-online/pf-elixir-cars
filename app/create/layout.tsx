import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/Footer";
import CarouselMarca from "./carouselMarca";

interface Props {
  children: React.ReactNode;
}

function HomeLayout({ children }: Props) {
  return (
    <div className=" max-w-full max-h-full ">
      {children}
      <CarouselMarca />
    </div>
  );
}
export default HomeLayout;
