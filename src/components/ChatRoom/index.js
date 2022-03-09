import React from "react";
import { Row, Col } from "antd";
import Siderbar from "./Siderbar";
import ChatWindow from "./ChatWindow/ChatWindow";

function ChatRoom(props) {
  return (
    <div >
      <Row>
        <Col span={6}>
          <Siderbar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

export default ChatRoom;
