import React from 'react'
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space, Select, Tooltip, Input } from "antd";
import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Header from "../Header/Header";
// import "./index.scss";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Upload, message, Image } from "antd";
import {
  removeProductById,
  getProductById,
  updateProduct,
} from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch } from "antd";
import { changeStatusUser } from "../../api/user";
import { getAllUser } from "../../api/account";
const BodySize = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [bodySize, setBodySize] = useState({
    soDoBoPhan: "",
    tenSoDo: "",
    imgUrl: "",
    videoUrl: "",
    minValue: "",
    maxValue: "",
  });
  const [stateUserDetail, setStateUserDetail] = useState({
    id: "",
    name: "",
    avatarUrl: "",
    username: "",
    address: "",
    phone: "",
    password: "",
  });
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    categorySlug: "",
    color: [],
    slug: "",
    idCategory: 0,
    size: [],
    description: "",
    namePath: [],
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    id: 0,
    name: "",
    price: "",
    categorySlug: "",
    idCategory: 0,
    color: [],
    slug: "",
    size: [],
    namePath: [],
    description: "",
  });
  const [stateProductUpdate, setStateProductUpdate] = useState({
    id: 0,
    name: "",
    price: "",
    categorySlug: "",
    idCategory: 0,
    color: [],
    slug: "",
    size: [],
    namePath: [],
    description: "",
  });
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  const [listProduct, setListProduct] = useState([
    { name: "test1" },
    { name: "test2" },
  ]);
  const [idProduct, setIdProduct] = useState(null);
  const [checkChange, setCheckChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [downloadURL, setDownloadURL] = useState("");


  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (avatarUrl) => (
        <Image.PreviewGroup>
          <Image
            src={avatarUrl}
            width={100}
            height={100}
            style={{ marginRight: "20px" }}
          />
        </Image.PreviewGroup>
      ),
      width: "15%",
    },
    {
      title: "Số đo của bộ phân",
      dataIndex: "soDoCuaBoPhan",
    },
    {
      title: "Tên cơ thể",
      dataIndex: "tenCoThe",
    },

    {
      title: "Clip hướng dẫn",
      dataIndex: "clipHuongDan",
    },
    {
      title: "Giá trị tối thiểu (cm)",
      dataIndex: "minValue",
    },
    {
      title: "Giá trị tối đa (cm)",
      dataIndex: "maxValue",
    },

    {
      title: "Tùy chỉnh",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <EditOutlined
              // onClick={() => handleGetDetailProduct(record)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteOutlined
              onClick={() => {
                setIsOpenModalDelete(true);
                setIdProduct(record.id);
              }}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const handleSubmit = async () => {
    // console.log(bodySize);
    // await createUser(bodySize).then((res) => {
    //   console.log(res);
    //   getListUser();
    //   toast.success("Thêm nhân viên thành công!", 1000, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   setIsOpenModalCreate(false);
    // });
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    setBodySize({
      name: null,
      avatarUrl: null,
      username: null,
      address: null,
      phone: null,
      password: null,
    });
    setDownloadURL(null);
    form.resetFields();
  };
  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  return (
    <div>
      <Header title="Số đo cơ thể" />
      <div
        style={{
          border: "1px solid #593d96",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <ModalComponent
          title="Thêm mới số đo cơ thể"
          open={isOpenModalCreate}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="Tạo mới" // Đổi nút OK thành "Tạo mới"
          cancelText="Hủy bỏ" // Đổi nút Cancel thành "Hủy bỏ"
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          // form={form}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Form.Item
                label="Số đo của bộ phận"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống số đo của bộ phận",
                  },
                ]}
              >
                <InputComponent
                  value={bodySize.soDoBoPhan}
                  // onChange={handleOnChange}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Tên số đo"
                name="tenSoDo"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Tên người dùng",
                  },
                ]}
              >
                <InputComponent
                  value={bodySize.tenSoDo}
                  // onChange={handleOnChange}
                  name="username"
                />
              </Form.Item>
            </div>
            <div>

            </div>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống Mật khẩu",
                },
              ]}
            >
              <Input.Password
                value={bodySize.password}
                // onChange={handleOnChange}
                name="password"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống Địa chỉ",
                },
              ]}
            >
              <InputComponent
                value={bodySize.address}
                // onChange={handleOnChange}
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống Số điện thoại",
                },
              ]}
            >
              <InputComponent
                value={bodySize.phone}
                // onChange={handleOnChange}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Hình đại diện"
              name="avatarUrl"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
            >
              <Upload
                name="avatarUrl"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
              // onChange={(e) => handleUpload(e)}
              >
                {/* {downloadURL ? (
                  <img
                    src={downloadURL}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )} */}
              </Upload>
            </Form.Item>
          </Form>
        </ModalComponent>

        <ModalComponent
          title="Xóa sản phẩm"
          open={isOpenModalDelete}
          onCancel={() => setIsOpenModalDelete(false)}
        // onOk={() => {
        //   handleRemoveProduct(idProduct);
        // }}
        >
          <LoadingComponent isLoading={false}>
            <div
              style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
            >{`Bạn có chắc chắn muốn xóa nhân viên này không này không?`}</div>
          </LoadingComponent>
        </ModalComponent>

        <ModalComponent
          title="Thông tin nhân viên"
          open={isOpenModalEdit}
          okText="Tạo mới" // Đổi nút OK thành "Tạo mới"
          cancelText="Hủy bỏ" // Đổi nút Cancel thành "Hủy bỏ"
          // onOk={handleUpdateUser}
          onCancel={() => {
            setIsOpenModalEdit(false);
            setCheckChange(false);
            setStateUserDetail({
              name: null,
              avatarUrl: null,
              username: null,
              address: null,
              phone: null,
              password: null,
            });
            // form.resetFields();
          }}
          width="50%"
        >
          <LoadingComponent isLoading={false}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            // form={form}
            >
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Họ và tên",
                  },
                ]}
              >
                <InputComponent
                  value={bodySize.name}
                  // onChange={handleOnChangeEdit}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Tên người dùng"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Tên người dùng",
                  },
                ]}
              >
                <InputComponent
                  value={stateUserDetail.username}
                  // onChange={handleOnChangeEdit}
                  name="username"
                />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Mật khẩu",
                  },
                ]}
              >
                <Input.Password
                  value={stateUserDetail.password}
                  // onChange={handleOnChangeEdit}
                  name="password"
                />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Địa chỉ",
                  },
                ]}
              >
                <InputComponent
                  value={stateUserDetail.address}
                  // onChange={handleOnChangeEdit}
                  name="address"
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống Số điện thoại",
                  },
                ]}
              >
                <InputComponent
                  value={stateUserDetail.phone}
                  // onChange={handleOnChangeEdit}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Hình đại diện"
                name="avatarUrl"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && [e.file]
                }
              >
                <Upload
                  name="avatarUrl"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                // onChange={(e) => handleUploadEdit(e)}
                >
                  {/* {downloadURL ? (
                    <img
                      src={downloadURL}
                      alt="avatar"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    uploadButton
                  )} */}
                </Upload>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </ModalComponent>

        <div style={{ marginTop: "20px", width: "75vw" }}>
          <TableComponent
            isLoading={false}
            columns={columns}
            data={listProduct}
            handleDelete={() => { }}
            handleOpenCreate={showModal}
            onRow={(record) => {
              return {
                onMouseEnter: (event) => {
                  console.log(event);
                  setIsRowSelected(record.id);
                  setIsNameUser(record.name);

                  setIdProduct(record.id);
                },
              };
            }}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default BodySize
