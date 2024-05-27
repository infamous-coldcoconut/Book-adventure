import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Pham Cong Minh 2024
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "black 2px solid",
    borderBottom: "green 2px solid",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "#23b2c4" };
}

export default Layout;