import Nav from "@/components/nav/nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Nav />
    </div>
  );
};

export default Layout;
