import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space, Select, Tooltip, Input } from "antd";
import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Header from "../Header/Header";
import "./index.scss";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Đường dẫn tới file firebaseConfig.js
import { createUser } from "../../api/account";
const AdminUser = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [stateUser, setStateUser] = useState({
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
            setDownloadURL(url);
            console.log("File available at", url);
            setStateUser({ ...stateUser, avatarUrl: url });
            // Gửi URL này đến server của bạn để lưu vào SQL Server
          });
        }
      );
    }
  };
  const [form] = Form.useForm();

  const handleToggleStatus = async (id, isChecked) => {
    console.log(isChecked);
    if (isChecked) {
      await changeStatusUser(id, 2).then((res) => {
        getListUser();
      });
    } else {
      await changeStatusUser(id, 1).then((res) => {
        getListUser();
      });
    }
  };
  const handleOnChangeUpdate = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setStateProductUpdate({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Cập nhật giá trị form với trạng thái mới
    form.setFieldsValue({
      name: stateProductDetail.name,
      price: stateProductDetail.price,
      color: stateProductDetail.color,
      slug: stateProductDetail.namePath,
      size: stateProductDetail.size,
      category: stateProductDetail.idCategory,
      description: stateProductDetail.description,
      namePath: stateProductDetail.namePath,
      // ... các trường khác
    });
  }, [stateProductDetail, form]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh đại diện",
      dataIndex: "avatarUrl",
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
      title: "Tên người dùng",
      dataIndex: "username",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "8%",
      render: (text, record) => {
        const isChecked = record.isActive === true ? true : false; // Giả sử trạng thái hoạt động là 'active'
        return (
          <Tooltip title={isChecked ? "Tắt" : "Mở"}>
            <Switch
              checked={isChecked}
              onChange={() => handleToggleStatus(record.id, !isChecked)}
              // Bạn có thể thêm thuộc tính style để tùy chỉnh màu sắc nếu muốn
            />
          </Tooltip>
        );
      },
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <EditOutlined
              onClick={() => handleGetDetailProduct(record)}
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

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    setStateUser({
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

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(stateUser);
    await createUser(stateUser).then((res) => {
      console.log(res);
      getListUser();
    });
    form.resetFields();
  };
  const getListUser = async () => {
    const data = {
      name: searchTerm,
    };
    await getAllUser().then((res) => {
      console.log(res);
      setListProduct(res);
    });
  };
  const handleRemoveProduct = async (record) => {
    await removeProductById(idProduct)
      .then((res) => {
        setIsOpenModalDelete(false);
        toast.success("Xóa thành công sản phẩm !", 2000, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getListUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Hình đại diện</div>
    </div>
  );
  const handleUpdateProduct = async () => {
    const imageUploadFormat = imageUpload.map((item) => {
      const base64String = item.split(",")[1];
      return {
        base64String,
      };
    });
    const imageReq = imageUploadFormat.map((item) => item.base64String);
    console.log(imageReq);
    console.log(stateProductUpdate);
    const data = {
      id: stateProductUpdate.id,
      name: stateProductUpdate.name,
      description: stateProductUpdate.description,
      price: stateProductUpdate.price,
      slug: "ao-thun",
      idCategory: stateProductUpdate.idCategory,
      idSize: stateProductUpdate.size,
      idColor: stateProductUpdate.color,
      base64String: imageReq,
    };
    await updateProduct(data).then((res) => {
      toast.success("Update thành công sản phẩm mới !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setIsOpenModalEdit(false);
      getListUser();
    });

    setStateProduct({
      title: null,
      price: null,
      categorySlug: null,
      color: [],
      slug: null,
      size: [],
      description: null,
    });
    form.resetFields();
  };
  const handleGetDetailProduct = async (record) => {
    console.log(record);
    setIsOpenModalEdit(true);

    await getProductById(record.id).then((res) => {
      setStateProductDetail({
        id: res.id,
        name: res.name,
        price: res.price,
        color: res.idColor,
        size: res.idSize,
        idCategory: res.idCategory,
        namePath: res.namePath,
        description: res.description,
        namePath: res.namePath,
      });
    });
    setIsOpenModalEdit(true);
  };

  useEffect(() => {
    getListUser();
  }, []);
  return (
    <div>
      <Header title="Nhân viên" />
      <div
        style={{
          border: "1px solid #593d96",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <ModalComponent
          title="Thêm mới nhân viên"
          open={isOpenModalCreate}
          onOk={handleSubmit}
          onCancel={handleCancel}
          footer={null}
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
            form={form}
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
                value={stateUser.name}
                onChange={handleOnChange}
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
                value={stateUser.username}
                onChange={handleOnChange}
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
                value={stateUser.password}
                onChange={handleOnChange}
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
                value={stateUser.address}
                onChange={handleOnChange}
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
                value={stateUser.phone}
                onChange={handleOnChange}
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
                onChange={(e) => handleUpload(e)}
              >
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
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                htmlType="submit"
                onClick={handleSubmit}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>

        <ModalComponent
          title="Xóa sản phẩm"
          open={isOpenModalDelete}
          onCancel={() => setIsOpenModalDelete(false)}
          onOk={() => {
            handleRemoveProduct(idProduct);
          }}
        >
          <LoadingComponent isLoading={false}>
            <div
              style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
            >{`Bạn có chắc chắn muốn xóa sản phẩm có name "${isNameUser}" này không?`}</div>
          </LoadingComponent>
        </ModalComponent>

        <DrawerComponent
          title="Thông tin sản phẩm"
          open={isOpenModalEdit}
          onClose={() => {
            setIsOpenModalEdit(false);
            setCheckChange(false);
            setStateProductDetail({
              name: null,
              price: null,
              categorySlug: null,
              color: [],
              slug: null,
              size: [],
              description: null,
            });
            form.resetFields();
          }}
          width="50%"
        >
          <LoadingComponent isLoading={false}>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input title product!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProductUpdate.name}
                  onChange={handleOnChangeUpdate}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price product!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProductUpdate.price}
                  onChange={handleOnChangeUpdate}
                  name="price"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description product!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProductUpdate.description}
                  onChange={handleOnChangeUpdate}
                  name="description"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 21,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleUpdateProduct}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </DrawerComponent>

        <div style={{ marginTop: "20px", width: "75vw" }}>
          <TableComponent
            isLoading={false}
            columns={columns}
            data={listProduct}
            handleDelete={() => {}}
            handleOpenCreate={showModal}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  console.log(event);
                  setIsRowSelected(record.id);
                  setIsNameUser(record.name);

                  // setIdProduct(record.id);
                },
              };
            }}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminUser;
