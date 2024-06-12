import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./components/appRouter.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
