import "./Classroom.scss";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Skeleton,
  Card,
  Avatar,
  Row,
  Col,
  Button,
  Modal,
  Space,
  Input,
  List,
  Tooltip,
  message,
} from "antd";
import {
  PlusOutlined,
  UsergroupAddOutlined,
  InfoCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { authService } from "../../services/auth.service";
import { ROLE_MODERATOR } from "../../utils/constants";
import {
  createClassroom,
  getClassrooms,
  getClassroomManage,
  joinClassroom,
} from "../../services/classroom.service";
import { useHistory } from "react-router-dom";
import { addRoom, updateRoom } from "../../firebase/services";
import shortid from "shortid";

const { Meta } = Card;

export default function Classroom() {
  const [classrooms, setClassrooms] = useState([]);
  const [classroomManage, setClassroomManage] = useState([]);
  const [classroomCode, setClassroomCode] = useState(null);

  const { user } = useSelector((state) => state.auth);
  let loading = false;
  const history = useHistory();
  //attribute of classroom
  const [classroomName, setClassroomName] = useState();

  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");

  //modal create classroom
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

  const currentUser = authService.getCurrentUser();
  const isModerator = currentUser.roles.includes(ROLE_MODERATOR);

  //get data class room
  useEffect(() => {
    getClassrooms(user.id)
      .then((res) => {
        setClassrooms(res.result);
      })
      .catch((err) => {
        console.log("server error");
      });

    return () => {
      setClassrooms([]);
    };
  }, [user]);

  //get data classroom Manage
  useEffect(() => {
    if (isModerator) {
      getClassroomManage(user.id)
        .then((res) => {
          setClassroomManage(res.result);
        })
        .catch((err) => {
          console.log("server error");
        });
    }

    return () => {
      setClassroomManage([]);
    };
  }, [user, isModerator]);

  const handleAccessClassroom = (classroomId) => {
    history.push(`/classroom/${classroomId}`);
  };

  const showJoinModal = () => {
    setIsJoinModalVisible(true);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  //create classroom
  const handleCreateClassroom = async () => {
    const data = {
      name: classroomName,
      subject: subject,
      code: shortid.generate(),
      room: room,
      owner: currentUser.id,
    };
    try {
      let result = await createClassroom(data);
      const uid = result.result._id;
      history.push(`classroom/${uid}`);
      setIsJoinModalVisible(false);
      addRoom({ classroomId: uid, members: [user.id] });
      message.success("Tạo lớp học thành công");
    } catch (error) {
      console.log(error);
    }
  };

  //join classroom
  const handleJoinClassroom = async () => {
    try {
      let result = await joinClassroom({
        classroomCode: classroomCode,
        userId: currentUser.id,
      });
      if (result?.result != false) {
        const uid = result.result._id;
        updateRoom(user.id, uid);

        history.push(`classroom/${uid}`);
        setIsJoinModalVisible(false);
      } else {
        message.error("Kiểm tra lãi mã lớp học của bạn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsCreateModalVisible(false);
    setIsJoinModalVisible(false);
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsJoinModalVisible(false);
    setClassroomCode("");
  };

  let joinClassModal = (
    <Modal
      className="modal-join-classroom"
      title="Tham gia lớp học"
      visible={isJoinModalVisible}
      onOk={() => handleJoinClassroom()}
      onCancel={() => handleCancel(false)}
      width={800}
    >
      <div className="classroom-code">
        <div className="classroom-code-title">
          <h2>Mã Lớp</h2>
          <p>
            Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
          </p>
        </div>
        <div className="classroom-code-input">
          <Space direction="vertical">
            <Input
              addonBefore="Mã lớp: "
              placeholder="Nhập mã lớp"
              value={classroomCode}
              onChange={(e) => {
                setClassroomCode(e.target.value);
              }}
            />
          </Space>
        </div>
      </div>
      <div className="classroom-code-note">
        <h3>Cách đăng nhập bằng mã lớp học</h3>
        <ul>
          <li>Sử dụng tài khoản được cấp phép</li>
          <li>
            Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu cách hoặc
            ký hiệu
          </li>
        </ul>
      </div>
    </Modal>
  );

  let createClassModal = (
    <Modal
      className="modal-create-classroom"
      title="Tạo lớp học mới"
      visible={isCreateModalVisible}
      onOk={() => handleCreateClassroom()}
      onCancel={() => handleCancel(false)}
      width={800}
    >
      <div className="input-infor-class">
        <Input
          placeholder="Nhập tên lớp học"
          prefix={<FormOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Nhập thông tin về tên lớp học">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
        />
      </div>
      <div className="input-infor-class">
        <Input
          placeholder="Nhập tên học phần"
          prefix={<FormOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Nhập thông tin về tên học phần">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="input-infor-class">
        <Input
          placeholder="Nhập tên chủ đề"
          prefix={<FormOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Nhập thông tin về tên chủ đề">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      </div>
      <div className="input-infor-class">
        <Input
          placeholder="Nhập tên phòng học"
          prefix={<FormOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Nhập thông tin về tên phòng học">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
    </Modal>
  );

  return (
    <div className="main">
      <div className="main__header">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="Danh sách lớp học"
          extra={
            <>
              <div className="list-action-btn">
                {isModerator ? (
                  <>
                    <Button
                      type="primary"
                      ghost
                      icon={<PlusOutlined />}
                      onClick={() => showCreateModal(true)}
                    >
                      Tạo lớp học
                    </Button>
                    {createClassModal}
                  </>
                ) : null}

                <Button
                  type="primary"
                  icon={<UsergroupAddOutlined />}
                  onClick={() => showJoinModal(true)}
                >
                  Tham gia lớp học
                </Button>
                {joinClassModal}
              </div>
            </>
          }
        ></Card>
      </div>
      <div className="main-content-classroom">
        <div className="member site-card-border-less-wrapper">
          <h3>Thành viên lớp học :</h3>
          <Row gutter={16}>
            {classrooms.map((classroom, index) => {
              return (
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 300, marginTop: 16 }}
                    actions={[]}
                    title={"Tên lớp: " + classroom.name}
                    onClick={() => {
                      console.log(classroom);
                      history.push(`/classroom/${classroom._id}`);
                    }}
                  >
                    <Skeleton loading={loading} avatar active>
                      {/* <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={"Tên lớp học: " + classroom.name}
                        description=""

                      /> */}
                      <p>{"Môn học: " + classroom.subject}</p>
                      <p>{"Phòng: " + classroom.room}</p>
                    </Skeleton>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
        {isModerator ? (
          <>
            <div
              className="manager site-card-border-less-wrapper"
              style={{ paddingTop: "20px" }}
            >
              <h3>Quản lý lớp học :</h3>
              <Row gutter={16}>
                {classroomManage.map((classroom, index) => {
                  return (
                    <Col span={8}>
                      <Card
                        hoverable
                        style={{ width: 300, marginTop: 16 }}
                        actions={[]}
                        title={"Tên lớp: " + classroom.name}
                        onClick={() => {
                          handleAccessClassroom(classroom._id);
                        }}
                      >
                        <Skeleton loading={loading} avatar active>
                          {/* <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={"Tên lớp học: " + classroom.name}
                        description=""

                      /> */}
                          <p>{"Môn học: " + classroom.subject}</p>
                          <p>{"Phòng: " + classroom.room}</p>
                        </Skeleton>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
