import React, { Suspense } from "react";
import Router from "../routes";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <Suspense fallback={<h1>loading..</h1>}>
    {/* <Header/> */}
    <ToastContainer/>
      <Router />
    </Suspense>
  );
}
