import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Kein #root gefunden");

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
