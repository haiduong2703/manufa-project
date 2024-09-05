import { Menu } from "antd";
import { useState } from "react";
import {
  ProductOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { getItem } from "../../utils/getItem";
import { useHistory } from "react-router-dom";
import AdminUser from "../../components/AdminUser/AdminUser";
import { removeUser } from "../../redux/user-modal/userModalSlice";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { WrapperContent } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import ImageUpload from "../../components/UploadFiles/UploadFile";
import logo from "../../assets/images/logo3.png";
import AdminMaterial from "../../components/AdminMaterial/AdminMaterial";

const Admin = () => {
  const [keySelected, setKeySelected] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem("role");
  const renderKey = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      case "material":
        return <AdminMaterial />;
      case "upload":
        return <ImageUpload />;
      case "logout":
        sessionStorage.clear();
        dispatch(removeUser());
        history.push("/login");

      default:
        return;
    }
  };

  const getMenuItemsByRole = (role) => {
    let menuItems = [
      getItem("Đăng xuất", "logout", <LogoutOutlined />), // Menu cho tất cả user
      getItem("Thống kê sản xuất", "sx", <LogoutOutlined />),
      getItem("Thống kê nguyên vật liệu", "vl", <LogoutOutlined />),
      getItem("Thống kê sản phẩm", "sp", <LogoutOutlined />),
    ];

    if (role === "admin") {
      menuItems = [
        getItem("Nhân viên", "user", <UserOutlined />),
        getItem("Quản lý sản phẩm", "product", <ProductOutlined />),
        ...menuItems,
      ];
    } else if (role === "manager") {
      menuItems = [
        getItem("Quản lý sản phẩm", "product", <ProductOutlined />),
        getItem(
          "Quản lý sản phẩm mẫu",
          "productTemplate",
          <ShoppingCartOutlined />
        ),
        getItem(
          "Quản lý nguyên vật liệu",
          "material",
          <ShoppingCartOutlined />
        ),
        ...menuItems,
      ];
    } else if (role === "staff") {
      menuItems = [
        getItem("Quản lý đơn hàng", "order", <ShoppingCartOutlined />),
        ...menuItems,
      ];
    } else if (role === "user") {
      menuItems = [
        getItem("Thông báo", "notification", <ContactsOutlined />),
        ...menuItems,
      ];
    }

    return menuItems;
  };

  const items = getMenuItemsByRole(role);

  const handleClick = ({ item, key }) => {
    setKeySelected(key);
  };

  return (
    <div style={{}}>
      <div style={{}}>
        <div
          className="logo"
          style={{
            textAlign: "center",
            width: "200px",
            //borderRight: "2px solid #ccc",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", padding: "10px" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Menu
            //mode="inline"
            onClick={handleClick}
            style={{
              width: 200,
              height: "150vh",
              borderRight: "1px solid #593d96",
            }}
            items={items}
          />
          <WrapperContent style={{ padding: "10px 15px 15px", flex: 1 }}>
            {renderKey(keySelected)}
          </WrapperContent>
        </div>
      </div>
    </div>
  );
};

export default Admin;
