import "./style.scss";
import { Avatar, Button, Tooltip, Input, Form } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { UserAddOutlined, SendOutlined } from "@ant-design/icons";
import Message from "../Message";
import { AppContext } from "../../../contexts/AppProviderContext";
import useFirestore from "../../../hooks/useFirestore";
import { createMessage } from "../../../firebase/services";
import { authService } from "../../../services/auth.service";

export default function ChatWindow() {
  const [ message, setMessage ] = useState("");
  const { sellectedRoom, usersRoom } = useContext(AppContext);
  const { setIsInviteUsersVisible, sellectedRoomId } = useContext(AppContext);
  const { user } = authService.getCurrentUser();
  
  const messageCondition = useMemo(() => {
    return {
      fieldsName: "roomId",
      operator: "==",
      compareValue: sellectedRoomId,
    };
  }, [sellectedRoomId]);

  const messages = useFirestore("messages", messageCondition).reverse();

  const handleInviteUser = () => {
    setIsInviteUsersVisible(true);
  };

  const sendMessage = async () => {
    const messageData = {
      roomId: sellectedRoomId,
      userId: user.uid,
      message: message,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    await createMessage(messageData);
    setMessage('');
  };

  return (
    <div>
      {sellectedRoom ? (
        <div>
          <header>
            <div className="room-infor">
              <p>
                {sellectedRoom && sellectedRoom.name}
                <span>{sellectedRoom && sellectedRoom.description}</span>
              </p>
            </div>
            <div className="room-users">
              <Button icon={<UserAddOutlined />} onClick={handleInviteUser}>
                Add User
              </Button>
              <Avatar.Group maxCount={2}>
                {usersRoom.map((user) => (
                  <Tooltip title={user.displayName} key={user.uid}>
                    <Avatar src={user.photoURL}>A</Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </header>

          <div className="message">
            <div className="message-list">
              {
                messages.slice(0).reverse().map((message) => 
                  <Message
                    key={ message.id }
                    name={ message.displayName }
                    avatarUrl={ message.photoURL }
                    createdAt={ new Date( message.created_at).toString() }
                    message={ message.message }
                  />
                )
              }
            </div>
            <div>
              <Form className="message-input">
                <Form.Item style={{ width: "calc(75vw - 85px)" }}>
                  <Input
                    placeholder="Type your message . . ."
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Item>
                <Button
                  type="send"
                  icon={<SendOutlined />}
                  onClick={sendMessage}
                >
                  Send
                </Button>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <h2>Choose Room Chat, Please</h2>
      )}
    </div>
  );
}
