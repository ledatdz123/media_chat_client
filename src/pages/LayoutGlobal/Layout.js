import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
const override={
  position: "absolute",
  top: "0",
  left: "0",
  textAlign: "center",
  right: "0",
  bottom: "0",
  backgroundColor: "rgb( 0 0 0 / 30%)",
  zIndex: "9999",
}
const Layout = () => {
  const statusLoading=useSelector(store=>store.loading.status)
  return (
    <div>
      <ScaleLoader loading={statusLoading} cssOverride={override} color="#36d7b7"/>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
