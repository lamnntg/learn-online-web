import "./style.scss";
import { Avatar, Button, Tooltip, Input, Form } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { UserAddOutlined, SendOutlined } from "@ant-design/icons";
import Message from "../Message";
import { AppContext } from "../../../contexts/AppProviderContext";
import useFirestore from "../../../hooks/useFirestore";
import { createMessage } from "../../../firebase/services";
import { authService } from "../../../services/auth.service";
import { useParams } from "react-router-dom";

export default function ChatWindow() {
  const { id } = useParams();
  const sellectedRoomId = id;
  const [ message, setMessage ] = useState("");
  const { rooms } = useContext(AppContext);
  const { setIsInviteUsersVisible } = useContext(AppContext);
  const user = authService.getCurrentUser();
  
  const sellectedRoom = rooms.find(
    (room) => room.classroomId == sellectedRoomId
  );

  const messageCondition = useMemo(() => {
    return {
      fieldsName: "classroomId",
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
      classroomId: sellectedRoomId,
      userId: user.id,
      message: message,
      displayName: user.name,
      photoURL: user.avatar_url
    }
    await createMessage(messageData);
    setMessage('');
  };

  return (
    <div>
      {sellectedRoom ? (
        <div>
          {/* <header>
            <div className="room-infor">
              <p>
                {sellectedRoom && sellectedRoom.name}
                <span>{sellectedRoom && sellectedRoom.description}</span>
              </p>
            </div>
          </header> */}

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
        <h2>Đang có lỗi xảy ra vui lòng thử lại</h2>
      )}
    </div>
  );
}
