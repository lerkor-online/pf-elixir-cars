import Header from "./header";

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
