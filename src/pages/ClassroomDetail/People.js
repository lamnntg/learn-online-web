import React, { useEffect, useState } from 'react';
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";
// Images
import useClassroom from "../../hooks/useClassroom";
import { isEmpty } from "lodash";
import face2 from "../../assets/images/face-2.jpg";


const { Title } = Typography;
// table code start
const columns = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Chức vụ",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];

const makeDataUsers = (users) => {
  return users.map((user, key) => {
    return  {
      key: key,
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={ user.avatar_url }
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{ user.name }</Title>
              <p>{ user.email }</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),
  
      status: (
        <>
          <Button type="primary" className="tag-primary">
            ONLINE
          </Button>
        </>
      ),

      employed: (
        <>
          <div className="ant-employed">
            <span>23/04/18</span>
            <a href="#pablo">Edit</a>
          </div>
        </>
      ),
    };
  });
}

function People(params) {
  let { id } = useParams();
  const classroom = useClassroom(params.match.params.id);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
 
  return (
    <div>
      <NavBar id={id} tab='people'/>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Thành viên trong lớp"
              // extra={
              //   <>
              //     <Radio.Group onChange={onChange} defaultValue="a">
              //       <Radio.Button value="a">All</Radio.Button>
              //       <Radio.Button value="b">ONLINE</Radio.Button>
              //     </Radio.Group>
              //   </>
              // }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={ isEmpty(classroom) ? [] : makeDataUsers(classroom.users) }
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default People;