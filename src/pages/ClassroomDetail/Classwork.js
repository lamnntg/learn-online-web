import React, { useEffect, useState } from "react";
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";
import { Menu, Dropdown, Button, message, Card, Avatar } from "antd";
import {
  PlusOutlined,
  BulbOutlined,
  BookOutlined,
  CarryOutOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="test" icon={<CarryOutOutlined />}>
      Bài kiểm tra
    </Menu.Item>
    <Menu.Item key="document" icon={<BookOutlined />}>
      Tài liệu
    </Menu.Item>
    <Menu.Item key="question" icon={<BulbOutlined />}>
      Câu hỏi
    </Menu.Item>
  </Menu>
);

const menuCard = (
  <Dropdown overlay={menu}>
    <Button type="link" icon={<MoreOutlined />} size="large"></Button>
  </Dropdown>
);

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

export default function Classwork(params) {
  let { id } = useParams();
  const classroom = useClassroom(params.match.params.id);

  useEffect(() => {
    return () => {};
  }, [params.match.params.id]);
  
  return (
    <div>
      <NavBar id={id} tab="homeworks" />
      <div className="">
        <Card title="">
          <div style={{ paddingBottom: "20px" }}>
            <Dropdown overlay={menu}>
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Tạo mới
              </Button>
            </Dropdown>
          </div>

          <Card
            type="inner"
            title={
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Lam Nguyen vừa đăng bài tập mới"
                // description="This is the description"
              />
            }
            extra={menuCard}
          >
            Inner Card content
          </Card>

          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title={
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Lam Nguyen vừa đăng bài tập mới"
              />
            }
            extra={menuCard}
          >
            Inner Card content
          </Card>
        </Card>
        ,
      </div>
    </div>
  );
}
