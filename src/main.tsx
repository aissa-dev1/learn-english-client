import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import AppRouter from "./components/appRouter.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";
import UnderDevelopment from "./components/underDevelopment.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnderDevelopment />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
