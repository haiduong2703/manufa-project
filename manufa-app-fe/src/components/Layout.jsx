import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user-modal/userModalSlice";
import RoutesAdmin from "../routes/RoutesAdmin";
const Layout = () => {
  const checkLogin = sessionStorage.getItem("checklogin");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  let checkUser = true;
  if (user.role === 2) {
    checkUser = false;
  }

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <RoutesAdmin />
          </div>
        )}
      />
    </BrowserRouter>
  );
};
export default Layout;
