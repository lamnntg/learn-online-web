import React from 'react';
import { Card, Avatar } from 'antd';

function CardQuestion(props) {
	const { title, desc } = props;
	const { Meta } = Card;
	return (
		<>
			<Card style={{ width: '100%' }}>
				<Meta avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />} title='Card title' description='This is the description' />
			</Card>
		</>
	);
}

export default CardQuestion;
