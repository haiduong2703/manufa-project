import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import NotFoundPage from "../pages/NotFoundPage";
import DashBoard from "../components/DashBoard";
import Login from "../pages/Login/Login";
const RoutesAdmin = () => {
  console.log("Hello");

  return (
    <Switch>
      <Route path="/admin" exact component={Admin} />
      <Route path="/admin" component={NotFoundPage} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
    </Switch>
  );
};

export default RoutesAdmin;
