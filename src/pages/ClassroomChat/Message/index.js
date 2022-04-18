import { Avatar } from "antd";
import React from "react";

export default function Message(props) {
  const { name, avatarUrl, createdAt, message, isMe } = props;
  let messageClass = isMe ? 'message-me' : '';
  return (
    <div className={`message-content ${messageClass}`}>
      <div>
        <Avatar src={avatarUrl}></Avatar>
        <span
          style={{ marginLeft: "5px", fontWeight: "bold", fontSize: "15px" }}
        >
          {name}
        </span>
        <span style={{ marginLeft: "5px", fontSize: "12px" }}>{createdAt}</span>
      </div>
      <div>
        <p style={{ marginLeft: "40px" }}> {message} </p>
      </div>
    </div>
  );
}
