import React from 'react'
import { Row, Col } from "antd";
import ChatWindow from "./ChatWindow";
import NavBar from "./../../components/Classroom/Navbar";
import { useParams } from 'react-router-dom';
export default function ClassroomChat() {
  let { id } = useParams();
  return (
    <>
    <NavBar id={id} tab="chats" />
    <Row>
      <Col span={24}>
        <ChatWindow />
      </Col>
    </Row>
    </>
  )
}
