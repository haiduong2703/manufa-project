import React from "react";
import "./index.scss";
const Filter = (props) => {
  const handleChange = () => {
    console.log("Helloo");
  };
  return (
    <div className="filter">
      <label>
        <input type="checkbox" onChange={handleChange} /> STT
      </label>
      <label>
        <input type="checkbox" /> Hình đại diện
      </label>
      <label>
        <input type="checkbox" /> Tên người dùng
      </label>
      <label>
        <input type="checkbox" /> Họ và tên
      </label>
      <label>
        <input type="checkbox" /> Địa chỉ
      </label>
      <label>
        <input type="checkbox" /> Số điện thoại
      </label>
    </div>
  );
};

export default Filter;
