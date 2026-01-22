import { Routes } from "react-router";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="readlater-extension">
      <Routes>{AppRoutes}</Routes>
    </ThemeProvider>
  );
}

export default App;
