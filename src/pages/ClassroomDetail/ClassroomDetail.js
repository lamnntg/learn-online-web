import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Typography, List, Avatar } from "antd";

import { useParams } from "react-router-dom";
import NavBar from "../../components/Classroom/Navbar";
import card from "../../assets/images/info-card-1.jpg";
import { getClassroomById } from "../../services/classroom.service";

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default function ClassroomDetail(props) {
  let { id } = useParams();
  const { Title, Text, Paragraph } = Typography;
  const [classroom, setClassroom] = useState({});
  const [classworks, setClassworks] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({});

  useEffect(() => {
    getClassroomById(id)
      .then((res) => {
        setClassroom(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onChange = (event) => {
    // Implement custom event logic...
    // When no value is returned, Slate will execute its own event handler when
    // neither isDefaultPrevented nor isPropagationStopped was set on the event
  };

  const onDrop = (event) => {
    // Implement custom event logic...

    // No matter the state of the event, treat it as being handled by returning
    // true here, Slate will skip its own event handler
    return true;
  };

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

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
      {id}
    </div>
  );
}
