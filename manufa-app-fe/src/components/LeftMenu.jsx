// src/components/LeftMenu.js
import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const LeftMenu = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <div className="logo">
        <img
          src="logo.png"
          alt="Logo"
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/dashboard">Quản lý chung</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/customers">Khách hàng</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<PieChartOutlined />}>
          <Link to="/orders">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PieChartOutlined />}>
          <Link to="/assignments">Phân công</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<PieChartOutlined />}>
          <Link to="/templates">Quản lý bản mẫu</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
