import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import NotFoundPage from "../pages/NotFoundPage";
import DashBoard from "../components/DashBoard";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
const RoutesAdmin = () => {
  console.log("Hello");

  return (
    <Switch>
      <PrivateRoute path="/admin" exact component={Admin} /> {/* Đã bảo vệ */}
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Login} />
      <Route component={NotFoundPage} />{" "}
      {/* Bất kỳ route nào khác sẽ hiển thị NotFoundPage */}
    </Switch>
  );
};

export default RoutesAdmin;
