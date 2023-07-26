import Nav from "@/components/nav/nav";
import Header from "./header";
import Footer from "@/components/footer/Footer";

interface Props {
  children: React.ReactNode;
}

function HomeLayout({ children }: Props) {
  return (
    <div className=" max-w-full max-h-full ">
      <Header />
      {children}
    </div>
  );
}
export default HomeLayout;
