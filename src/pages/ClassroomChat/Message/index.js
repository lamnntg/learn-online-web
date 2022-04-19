import { Avatar, Row, Col } from 'antd';
import React from 'react';

import './style.scss';

export default function Message(props) {
	const { name, avatarUrl, createdAt, message, isMe } = props;
	let messageClass = isMe ? 'message-me' : '';
	return (
		<div className={`message-content ${messageClass}`}>
			<Row className='message-other'>
				<Col span={2}>
					<Avatar src={avatarUrl} style={{ border: '2px solid rgb(219 218 218)' }}></Avatar>
				</Col>
				<Col span={21} className={`message-user ${isMe ? 'message-user-me' : 'message-user-other'}`}>
					<div className='message-user-info'>
						<span style={{ fontWeight: 'bold', fontSize: '15px' }}>{name}</span>
						<span style={{ fontSize: '12px' }}>{createdAt}</span>
					</div>
					<p className='message-text'> {message} </p>
				</Col>
			</Row>
		</div>
	);
}
