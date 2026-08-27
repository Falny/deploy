import { Navbar } from "./components/navbar/index";
import { AddProduct } from "./components/addProduct/index";

export const Layout = () => {
  return (
    <div
      className="layout-admin"
      style={{ display: "flex", backgroundColor: "#fff", color: "#000" }}
    >
      <Navbar />
      <AddProduct />
    </div>
  );
};
