import { useState } from "react";
import { authService } from "../services/auth.service";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  Image,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-works.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import { userService } from "../services/user.service";
import { toBase64 } from "../common/ConvertImageToBase64";

function Profile() {
  const user = authService.getCurrentUser();
  const isMorderator = authService.checkModerator();
  const [visible, setVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || profilavatar);
  const [avatar, setAvatar] = useState(null);
  const [, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    setAvatar(file);
    return true;
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();

    const fileBase64 = await toBase64(avatar);
    fmData.append("avatar", fileBase64);
    fmData.append("id", user.id);
    try {
      const res = await userService.uploadAvatar(fmData);

      let newUser = { ...user, avatar_url: res.result };
      setAvatarUrl(res.result);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleChange = async (info) => {};

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div></div>
    </div>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  function successUpdateUser() {
    Modal.success({
      content: "Cập nhật thông tin thành công!",
    });
  }

  const handleOk = async () => {
    let data = { name, email, phone, address, description };
    for (let key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }

    const id = user.id ?? user._id;
    await userService.updateUser(id, data).then((res) => {
      const newUser = { ...user, ...res.data.result };
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newUser));
      resetForm();
      setIsModalVisible(false);
      successUpdateUser();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setDescription("");
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group style={{ position: "relative" }}>
                <Row
                  style={{
                    opacity: 0,
                    position: "absolute",
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    width: "72px",
                    height: "72px",
                  }}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader projects-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    customRequest={uploadImage}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {uploadButton}
                  </Upload>
                </Row>
                <Avatar
                  className="cursor-pointer"
                  size={74}
                  shape="square"
                  src={avatarUrl}
                ></Avatar>

                <Col style={{ position: "absolute", display: "none" }}>
                  <Image
                    width={200}
                    src={avatarUrl}
                    preview={{
                      visible,
                      src: avatarUrl,
                      onVisibleChange: (value) => {
                        setVisible(value);
                      },
                    }}
                  />
                </Col>

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {user.name}{" "}
                    <EyeOutlined
                      className="hoverIcon"
                      title="Xem ảnh đại diện"
                      onClick={() => setVisible(true)}
                    />
                  </h4>
                  <p>{isMorderator ? "Quản lý" : "Người dùng"}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        {/* <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col> */}
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông tin cá nhân</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button type="link" onClick={showModal}>
                {pencil}
              </Button>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark"> {user.description} </p>
            <hr className="my-25" />
            <Descriptions title={user.username}>
              <Descriptions.Item label="Full Name" span={3}>
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user.phone || "0967999999"}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={3}>
                {user.address}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Modal
            title="Thay đổi thông tin cá nhân"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Cập nhật"
            cancelText="Hủy bỏ"
          >
            <Form {...layout} name="nest-messages">
              <Form.Item name={["name"]} label="Tên người dùng">
                <Input value={name} onChange={onChangeName} />
              </Form.Item>
              <Form.Item name={["phone"]} label="Số điện thoại">
                <Input value={phone} onChange={onChangePhone} />
              </Form.Item>
              <Form.Item
                name={["email"]}
                label="Email"
                rules={[{ type: "email" }]}
              >
                <Input value={email} onChange={onChangeEmail} />
              </Form.Item>
              <Form.Item name={["address"]} label="Địa chỉ">
                <Input value={address} onChange={onChangeAddress} />
              </Form.Item>
              <Form.Item name={["description"]} label="Mô tả bản thân">
                <Input.TextArea
                  value={description}
                  onChange={onChangeDescription}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Bạn bè</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Chứng chỉ khóa học</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col
              span={24}
              md={12}
              xl={6}
              key={index}
              className="cursor-pointer"
            >
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default Profile;
