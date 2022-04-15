import React from 'react'
import { Row, Col } from "antd";
import ChatWindow from "./ChatWindow";

export default function ClassroomChat() {
  return (
    <>
    <div>classroomChat</div>
    <Row>
        <Col span={6}>
          {/* <Siderbar /> */}
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </>
  )
}
