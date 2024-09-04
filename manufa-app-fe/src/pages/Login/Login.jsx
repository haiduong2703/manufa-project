import React, { useState } from "react";
import "./index.scss";
import img from "../../assets/images/imagelogin.jpg";
import logo from "../../assets/images/logo3.png";
import { getUserByLogin } from "../../api/account";
import { useHistory } from "react-router-dom";
const Login = () => {
  console.log("Hello login");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn form submit
    console.log(username);
    await getUserByLogin(username, password).then((res) => {
      if (res.checkPass !== false) {
        console.log(res);
        sessionStorage.setItem("name", res.name);
        sessionStorage.setItem("checklogin", res.checkPass);
        //sessionStorage.setItem("username",res.username);
        history.push("/admin");
      }
    });
  };
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="Login Visual" />
      </div>
      <div className="login-form">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Đăng nhập</h2>
        <form>
          <div className="input-group">
            <label>Tên đăng nhập *</label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu *</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit" onClick={handleLogin} className="login-button">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
