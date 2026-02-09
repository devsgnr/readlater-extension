import { Route } from "react-router-dom";
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import CreateCollection from "@/pages/create-collection";
import Home from "@/pages/home";
import Auth from "@/pages/auth";

const AppRoutes = (
  <React.Fragment>
    <Route path="/" element={<AppLayout />}>
      <Route index={true} element={<Home />} />
      <Route path="create" element={<CreateCollection />} />
      <Route path="auth" element={<Auth />} />
    </Route>
  </React.Fragment>
);

export default AppRoutes;
