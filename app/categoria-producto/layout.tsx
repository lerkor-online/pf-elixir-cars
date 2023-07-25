import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
