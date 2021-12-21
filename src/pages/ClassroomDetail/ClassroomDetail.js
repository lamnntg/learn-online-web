import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Avatar,
  Divider,
  message,
  Button,
  Modal,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Classroom/Navbar";
import card from "../../assets/images/info-card-1.jpg";
import useClassroom from "../../hooks/useClassroom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";

export default function ClassroomDetail(props) {
  let { id } = useParams();
  const { Title, Text, Paragraph } = Typography;
  const [classworks, setClassworks] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({});
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const classroom = useClassroom(id);
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  return (
    <div>
      <NavBar id={id} tab="news" />
      <div>
        <Row gutter={[24, 0]} justify="center">
          <Col className="mb-24">
            <Card bordered={true} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Lớp học</Text>
                      <Title level={5}>Tên lớp : {classroom.name}</Title>
                      <Paragraph
                        className="lastweek mb-36"
                        style={{ width: "50vw" }}
                      >
                        Môn học : {classroom.subject} - Phòng : {classroom.room}
                      </Paragraph>
                    </div>
                    <Row gutter={[16, 16]} style={{ fontWeight: "bold" }}>
                      <Col>Mã lớp :</Col>
                      <Col>
                        <Paragraph copyable>{classroom.code}</Paragraph>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider orientation="left">
        <Button
          shape="circle"
          icon={<PlusCircleOutlined />}
          style={{ marginRight: "50px" }}
          onClick={() => setVisible(true)}
        >
          Tạo thông báo
        </Button>
        Thông báo lớp học
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">Nguyen Tung Lam</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />

      <Modal
        title="Tạo thông báo cho lớp học"
        centered
        visible={visible}
        onOk={() => {
          message.success("Thông báo đã được tạo thành công");
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Modal>
    </div>
  );
}
