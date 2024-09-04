import React from "react";
import { Route, Redirect } from "react-router-dom";

// Giả sử bạn có trạng thái xác thực trong ứng dụng của mình
const isAuthenticated = () => {
  // Trả về true nếu người dùng đã đăng nhập, false nếu chưa
  // Ví dụ: kiểm tra token trong localStorage hoặc context API
  return !!sessionStorage.getItem("checklogin"); // Ví dụ sử dụng localStorage
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(sessionStorage.getItem("checklogin"));
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
