import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/fonts/open_runde/stylesheet.css";
import "../public/fonts/switzer/switzer.css";
import "../public/fonts/expose/expose.css";
import "./index.css";
import App from "./App.tsx";
import { MemoryRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  </StrictMode>,
);
