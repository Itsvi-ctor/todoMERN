import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.8rem" } }}
      ></Toaster>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
        </Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </>
  );
};

export default App;
