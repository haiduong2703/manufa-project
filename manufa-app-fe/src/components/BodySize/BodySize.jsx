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
import { createBodySize, getAllBodySize, getAllComponentType } from '../../api/bodySize';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";



const BodySize = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [bodySize, setBodySize] = useState({
    typeId: "",
    name: "",
    image: "",
    videoUrl: "",
    minSize: "",
    maxSize: "",
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

  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [checkChange, setCheckChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUploadImg, setLoadingUploadImg] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  let toastShownCreate = false;

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
      dataIndex: "image",
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
      dataIndex: "name",
    },

    {
      title: "Clip hướng dẫn",
      dataIndex: "clipHuongDan",
    },
    {
      title: "Giá trị tối thiểu (cm)",
      dataIndex: "minSize",
    },
    {
      title: "Giá trị tối đa (cm)",
      dataIndex: "maxSize",
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
    console.log(bodySize);
    await createBodySize(bodySize).then((res) => {
      console.log(res);
      fetchBodySize();
      toast.success("Thêm nhân viên thành công!", 1000, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsOpenModalCreate(false);
    });
    // form.resetFields();
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
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loadingUploadImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  const handleOnChange = (e) => {
    setBodySize({
      ...bodySize,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSelect = (value) => {
    console.log({ value })
    setBodySize({
      ...bodySize,
      typeId: value,
    });
  };



  const fetchBodySize = async () => {
    try {
      const res = await getAllBodySize(1, 10)
      console.log({ res })
      setListProduct(res)
    } catch (error) {
      console.log({ error })
    }
  }
  const [selectOption, setSelectOption] = useState([])
  const fetchComponentType = async () => {
    try {
      const res = await getAllComponentType()
      console.log({ res })
      setSelectOption(res)
    } catch (error) {
      console.log({ error })
    }
  }


  useEffect(() => {
    fetchBodySize()
    fetchComponentType()
  }, [])

  const handleUpload = (e) => {
    const file = e.file.originFileObj; // Lấy file từ sự kiện
    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Xử lý tiến trình tải lên nếu cần
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (!toastShownCreate) {
              toast.success("Tải ảnh lên thành công!", 1000, {
                position: toast.POSITION.TOP_RIGHT,
              });
              toastShownCreate = true; // Đánh dấu là toast đã được hiển thị
            }
            setDownloadURL(url);
            console.log("File available at", url);
            setBodySize({ ...bodySize, image: url });
            // Gửi URL này đến server của bạn để lưu vào SQL Server
          });
        }
      );
    }
  };
  return (
    <div>
      <Header title="Số đo cơ thể" name="Số đo cơ thể" />
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
            name="validateOnly" layout="vertical" autoComplete="off" form={form}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '70%' }}>
                <Form.Item
                  label="Số đo của bộ phận"
                  name="typeId"
                  layout="vertical"
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống số đo của bộ phận",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn số đo của bộ phận "
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={bodySize.typeId}
                    onChange={handleOnSelect}
                    options={selectOption}
                  />
                </Form.Item>

                <Form.Item
                  label="Tên số đo"
                  layout="vertical"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống Tên người dùng",
                    },
                  ]}
                >
                  <InputComponent
                    value={bodySize.name}
                    onChange={handleOnChange}
                    name="name"
                  />
                </Form.Item>
              </div>
              <div>
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  onChange={(e) => handleUpload(e)}
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
                >
                  {/* {bodySize.image ? <img src={bodySize.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                  {downloadURL ? (
                    <img
                      src={downloadURL}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
            <Form.Item
              label="Video hướng dẫn"
              layout="vertical"

              name="videoUrl"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống video hướng dẫn",
                },
              ]}
            >
              <InputComponent
                value={bodySize.videoUrl}
                onChange={handleOnChange}
                name="videoUrl"
              />
            </Form.Item>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Item
                label="Giá trị tối thiểu (cm)"
                name="minSize"
                layout="vertical"

                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống giá trị tối thiểu",
                  },
                ]}
              >
                <InputComponent
                  value={bodySize.minSize}
                  onChange={handleOnChange}
                  name="minSize"
                />
              </Form.Item>
              <Form.Item
                label="Giá trị tối đa (cm)"
                name="maxSize"
                layout="vertical"

                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống giá trị tối đa",
                  },
                ]}
              >
                <InputComponent
                  value={bodySize.maxSize}
                  onChange={handleOnChange}
                  name="maxSize"
                />
              </Form.Item>
            </div>


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
