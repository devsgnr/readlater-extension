// Components
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div className="w-full bg-(--background) text-(--foreground)">
      <Header />

      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
