import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/fonts/open_runde/stylesheet.css";
import "../public/fonts/switzer/switzer.css";
import "../public/fonts/expose/expose.css";
import "./index.css";
import { MemoryRouter } from "react-router";
import { Routes } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import PayloadProvider from "./provider/PayloadProvider";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="readlater-extension">
        <PayloadProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{AppRoutes}</Routes>
          </MemoryRouter>
        </PayloadProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export function render(el: HTMLElement) {
  createRoot(el).render(<App />);
}
