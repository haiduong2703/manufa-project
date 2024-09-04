import React from "react";
import "./index.scss";
import avt from "../../assets/images/avt.png";
import { Tooltip, Menu, Dropdown } from "antd";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
const Header = (props) => {
  const handleMenuClick = (e) => {
    if (e.key === "viewProfile") {
      // Handle "Xem thông tin cá nhân" action
      console.log("Xem thông tin cá nhân");
    } else if (e.key === "logout") {
      // Handle "Đăng xuất" action
      console.log("Đăng xuất");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="viewProfile">Xem thông tin cá nhân</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );
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
            <Dropdown overlay={menu} trigger={["click"]}>
              <Tooltip title="Tùy chọn">
                <img
                  src={avt}
                  alt="User Avatar"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Dropdown>
          </span>
          <span>{sessionStorage.getItem("name")}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
