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
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

export default function Classroom() {
  let classrooms = [1, 2, 3, 4, 5];
  let loading = false;
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let modal = (
    <Modal
      className="modal-create-classroom"
      title="Tham gia lớp học"
      visible={isModalVisible}
      onOk={() => handleOk(false)}
      onCancel={() => handleCancel(false)}
      width={800}
    >
      <div className="classroom-code">
        <div className="classroom-code-title">
          <h2>Mã Lớp</h2>
          <p>Nhập mã lớp của bạn vào đây</p>
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
                <Button type="primary" onClick={() => showModal(true)}>
                  Join Class
                </Button>

                <Button type="primary" onClick={() => showModal(true)}>
                  Join Class
                </Button>
              </div>
             

              {modal}
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
