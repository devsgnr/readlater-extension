import { Route } from "react-router-dom";
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import Settings from "@/pages/settings";
import Home from "@/pages/home";

const AppRoutes = (
  <React.Fragment>
    <Route path="/" element={<AppLayout />}>
      <Route index={true} element={<Home />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </React.Fragment>
);

export default AppRoutes;
