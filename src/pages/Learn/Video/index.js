import { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Timeline } from 'antd';

import './Video.style.scss';

function CourseVideo() {
	const { Title, Text } = Typography;

	const dummyData = [
		{
			id: 0,
			title: 'Lời khuyên trước khóa học',
			url: 'https://www.youtube.com/watch?v=-jV06pqjUUc',
			time: '10:30',
		},
		{
			id: 1,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 2,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 3,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 4,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 5,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 6,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 7,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 8,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 9,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 10,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 11,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 12,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
		{
			id: 13,
			title: 'Cài đặt môi trường',
			url: 'https://www.youtube.com/watch?v=efI98nT8Ffo',
			time: '10:30',
		},
		{
			id: 14,
			title: 'Sử dụng JS trong file HTML',
			url: 'https://www.youtube.com/watch?v=W0vEUmyvthQ',
			time: '10:34',
		},
	];
	const [course, setCourse] = useState(null);

	useEffect(() => {
		setCourse({ ...dummyData[0] });
	}, []);

	const chooseCourse = (course) => {
		setCourse({ ...course });
	};

	const converPath = (path) => {
		return path.replace('watch?v=', 'embed/');
	};

	return (
		<>
			<Row gutter={[24, 0]} className='h-full video'>
				<Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24 h-full video-left'>
					<div className='h-full'>
						{course && (
							<>
								<div>
									<Title level={3}>{course.title}</Title>
								</div>
								<div className='h-full'>
									<iframe
										width='100%'
										height='70%'
										src={converPath(course.url)}
										title='YouTube video player'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen></iframe>
								</div>
							</>
						)}
					</div>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24 video-right'>
					<Card bordered={false} className='criclebox h-full'>
						<div className='timeline-box'>
							<Title style={{ marginBottom: 24 }} level={5}>
								Danh sách bài học
							</Title>
							<Timeline
								pending='Đang tải khóa học...'
								className='timelinelist'
								style={{ height: '70vh', overflow: 'scroll', paddingTop: '10px' }}>
								{course &&
									dummyData.map((t, index) => (
										<Timeline.Item key={index}>
											<Title
												className='cursor-pointer text-hover'
												level={5}
												style={{ color: t.id === course.id ? '#eb2f96' : '' }}
												onClick={() => chooseCourse(t)}>
												{index}. {t.title}
											</Title>
											<Text>{t.time}</Text>
										</Timeline.Item>
									))}
							</Timeline>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
}
export default CourseVideo;
