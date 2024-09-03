import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import NotFoundPage from "../pages/NotFoundPage";
import DashBoard from "../components/DashBoard";
const RoutesAdmin = () => {
  console.log("Hello");

  return (
    <Switch>
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/" component={Admin} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/admin" component={NotFoundPage} />
    </Switch>
  );
};

export default RoutesAdmin;
