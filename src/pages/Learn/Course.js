import React from 'react';

import { Row, Col, Card } from 'antd';

import './Course.style.scss';

const Course = (props) => {
	const { img } = props;
	return (
		<>
			<Col xs={12} xl={6} className='mb-24'>
				<Card bordered={false} className='widget-2 h-full course' height={200}>
					<div className='course-title'>Xem khóa học</div>
					<div className='course-img' height={200}>
						<img className='img' src={img} alt='' />
					</div>
				</Card>
			</Col>
		</>
	);
};

export default Course;
