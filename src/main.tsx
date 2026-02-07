import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/fonts/open_runde/stylesheet.css";
import "../public/fonts/switzer/switzer.css";
import "../public/fonts/expose/expose.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div></div>
  </StrictMode>,
);
