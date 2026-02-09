import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MemoryRouter } from "react-router";
import { Routes } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import PayloadProvider from "./provider/PayloadProvider";
import { ThemeProvider } from "./components/theme-provider";
import ShadowRootProvider from "./provider/ShadowRootProvider";

interface Props {
  shadowRoot: ShadowRoot;
}

function App({ shadowRoot }: Props) {
  return (
    <StrictMode>
      <ShadowRootProvider shadowRoot={shadowRoot}>
        <ThemeProvider defaultTheme="system" storageKey="readlater-extension">
          <PayloadProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>{AppRoutes}</Routes>
            </MemoryRouter>
          </PayloadProvider>
        </ThemeProvider>
      </ShadowRootProvider>
    </StrictMode>
  );
}

export function render(el: HTMLElement, shadowRoot: ShadowRoot) {
  createRoot(el).render(<App shadowRoot={shadowRoot} />);
}
