import './style.scss';
import { Avatar, Button, Tooltip, Input, Form, Spin } from 'antd';
import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { UserAddOutlined, SendOutlined } from '@ant-design/icons';
import Message from '../Message';
import { AppContext } from '../../../contexts/AppProviderContext';
import useFirestore from '../../../hooks/useFirestore';
import { createMessage } from '../../../firebase/services';
import { authService } from '../../../services/auth.service';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function ChatWindow() {
  const { id } = useParams();
  const sellectedRoomId = id;
  const [message, setMessage] = useState('');
  const { rooms } = useContext(AppContext);
  const { setIsInviteUsersVisible } = useContext(AppContext);
  const user = authService.getCurrentUser();
  const messageCondition = useMemo(() => {
    return {
      fieldsName: 'classroomId',
      operator: '==',
      compareValue: sellectedRoomId,
      limit: 10
    };
  }, [sellectedRoomId]);

  const messages = useFirestore('messages', messageCondition);

  const sellectedRoom = rooms.find(room => room.classroomId == sellectedRoomId);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [messages]);

  const scrollToBottom = () => {
    const el = document.getElementById('message-list');
    if (el) {
      el.scrollTo({ top: 10000, behavior: 'smooth' });
    }
  };

  const sendMessage = async () => {
    if (message === '') {
      return;
    }
    const messageData = {
      classroomId: sellectedRoomId,
      userId: user.id,
      message: message,
      displayName: user.name,
      photoURL: user.avatar_url
    };
    await createMessage(messageData);
    setMessage('');
  };

  return (
    <div>
      {sellectedRoom ? (
        <div>
          <div className="message">
            <div className="message-list" id="message-list">
              {messages
                .slice(0)
                .reverse()
                .map(message => {
                  if (message.userId === user.id) {
                    return (
                      <Message
                        key={message.id}
                        name={message.displayName}
                        avatarUrl={message.photoURL}
                        createdAt={moment(message.created_at).format('YYYY-MM-DD, hh:mm a')}
                        message={message.message}
                        isMe={true}
                      />
                    );
                  } else {
                    return (
                      <Message
                        key={message.id}
                        name={message.displayName}
                        avatarUrl={message.photoURL}
                        createdAt={moment(message.created_at).format('YYYY-MM-DD, hh:mm a')}
                        message={message.message}
                        isMe={false}
                      />
                    );
                  }
                })}
            </div>
            <div>
              <Form className="message-input">
                <Form.Item style={{ width: 'calc(75vw - 85px)' }}>
                  <Input
                    placeholder="Type your message . . ."
                    autoComplete="off"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        sendMessage();
                      }
                    }}
                  />
                </Form.Item>
                <Button type="send" icon={<SendOutlined />} onClick={sendMessage}>
                  Send
                </Button>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-400px'
          }}
        />
      )}
    </div>
  );
}

