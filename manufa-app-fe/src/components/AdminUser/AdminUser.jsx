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
import {
  createUser,
  updateUser,
  getStaffById,
  changeStatusStaff,
  deletedStaffById,
} from "../../api/account";
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
  let toastShownCreate = false; // Biến cờ để kiểm soát việc hiện toast
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
            setStateUser({ ...stateUser, avatarUrl: url });
            // Gửi URL này đến server của bạn để lưu vào SQL Server
          });
        }
      );
    }
  };
  let toastShown = false; // Biến cờ để kiểm soát việc hiện toast

  const handleUploadEdit = (e) => {
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
            if (!toastShown) {
              toast.success("Tải ảnh lên thành công!", 1000, {
                position: toast.POSITION.TOP_RIGHT,
              });
              toastShown = true; // Đánh dấu là toast đã được hiển thị
            }
            setDownloadURL(url);
            console.log("File available at", url);
            setStateUserDetail({ ...stateUserDetail, avatarUrl: url });
            // Gửi URL này đến server của bạn để lưu vào SQL Server
          });
        }
      );
    }
  };

  const [form] = Form.useForm();

  const handleToggleStatus = async (id, isChecked) => {
    console.log(isChecked);
    await changeStatusStaff(id, isChecked).then((res) => {
      getListUser();
    });
  };

  useEffect(() => {
    // Cập nhật giá trị form với trạng thái mới
    form.setFieldsValue({
      name: stateUserDetail.name,
      password: stateUserDetail.password,
      username: stateUserDetail.username,
      address: stateUserDetail.address,
      phone: stateUserDetail.phone,
      // /avatarUrl: stateUserDetail.avatarUrl,
      // ... các trường khác
    });
  }, [stateUserDetail, form]);

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
  const handleOnChangeEdit = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    console.log(stateUser);
    await createUser(stateUser).then((res) => {
      console.log(res);
      getListUser();
      toast.success("Thêm nhân viên thành công!", 1000, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsOpenModalCreate(false);
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
    await deletedStaffById(idProduct)
      .then((res) => {
        setIsOpenModalDelete(false);
        toast.success("Xóa thành công nhân viên này!", 1000, {
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
  const handleUpdateUser = async () => {
    console.log(stateUserDetail);
    await updateUser(stateUserDetail.id, stateUserDetail).then((res) => {
      toast.success("Cập nhập thông tin nhân viên thành công!", 1000, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res);
      getListUser();
      setIsOpenModalEdit(false);
    });
  };

  const handleGetDetailProduct = async (record) => {
    setIsOpenModalEdit(true);
    await getStaffById(record.id).then((res) => {
      setDownloadURL(res.avatarUrl);
      console.log(res);
      setStateUserDetail({
        id: res.accountId,
        name: res.name,
        username: res.username,
        password: res.password,
        address: res.address,
        phone: res.phone,
        avatarUrl: res.avatarUrl,
      });
    });
    // setIsOpenModalEdit(true);
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
            >{`Bạn có chắc chắn muốn xóa nhân viên này không này không?`}</div>
          </LoadingComponent>
        </ModalComponent>

        <ModalComponent
          title="Thông tin nhân viên"
          open={isOpenModalEdit}
          okText="Tạo mới" // Đổi nút OK thành "Tạo mới"
          cancelText="Hủy bỏ" // Đổi nút Cancel thành "Hủy bỏ"
          onOk={handleUpdateUser}
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
            form.resetFields();
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
                  onChange={handleOnChangeEdit}
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
                  onChange={handleOnChangeEdit}
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
                  onChange={handleOnChangeEdit}
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
                  onChange={handleOnChangeEdit}
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
                  onChange={handleOnChangeEdit}
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
                  onChange={(e) => handleUploadEdit(e)}
                >
                  {downloadURL ? (
                    <img
                      src={downloadURL}
                      alt="avatar"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    uploadButton
                  )}
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
            handleDelete={() => {}}
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
  );
};

export default AdminUser;
