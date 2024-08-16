import { useState } from "react";
import "./App.css";
import { store } from "./store/index";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
