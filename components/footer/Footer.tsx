interface footerProps {
  createdBy: string;
}

const Footer: React.FC<footerProps> = ({ createdBy }) => {
  return (
    <footer>
      <div
        className="p-4 text-center"
        style={{ backgroundColor: "#071952", color: "#fff" }}
      >
        <h3>{createdBy}</h3>
      </div>
    </footer>
  );
};

export default Footer;
