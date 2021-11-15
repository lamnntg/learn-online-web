import "./Classroom.scss";
import React, { useState } from "react";
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
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  InfoCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { authService } from "../../services/auth.service";
import { ROLE_MODERATOR } from "../../utils/constants";

const { Meta } = Card;

export default function Classroom() {
  let classrooms = [1, 2, 3, 4, 5];
  let loading = false;
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [isCreateModalVisible, setCreateIsModalVisible] = useState(false);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

  const currentUser = authService.getCurrentUser();
  const isModerator = currentUser.roles.includes(ROLE_MODERATOR);

  const showJoinModal = () => {
    setIsJoinModalVisible(true);
  };

  const showCreateModal = () => {
    setCreateIsModalVisible(true);
  };

  const handleOk = () => {
    setCreateIsModalVisible(false);
    setIsJoinModalVisible(false);
  };

  const handleCancel = () => {
    setCreateIsModalVisible(false);
    setIsJoinModalVisible(false);
  };

  let joinClassModal = (
    <Modal
      className="modal-join-classroom"
      title="Tham gia lớp học"
      visible={isJoinModalVisible}
      onOk={() => handleOk(false)}
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
            <Input addonBefore="Mã lớp: " placeholder="Nhập mã lớp" />
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
      onOk={() => handleOk(false)}
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
      <div className="main-content">
        <Row gutter={16}>
          {classrooms.map((classroom, index) => {
            return (
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Skeleton>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
