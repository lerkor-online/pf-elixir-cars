import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/nav";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
