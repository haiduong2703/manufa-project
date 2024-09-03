import React from "react";
import "./index.scss";
import avt from "../../assets/images/avt.png";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
const Header = (props) => {
  return (
    <div className="header-components">
      <div className="breadcrumb">
        <span>
          <HomeOutlined />/
        </span>
        <span>{props.title}</span>
      </div>
      <div className="container-staff">
        <div className="page-title">
          <h2>Nhân viên</h2>
        </div>
        <div className="user-info">
          <span>
            <BellOutlined style={{ fontSize: "22px" }} />
          </span>
          <span>
            <img src={avt} alt="User Avatar" />
          </span>
          <span>Cô Tuệ</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
