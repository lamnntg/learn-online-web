import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Row, Col, Card, Button, Avatar, Upload, message } from 'antd';
import { getAllQA } from '../../services/questions.service';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { getAllQAByUserId } from '../../services/questions.service';

import './style.scss';

function Questions() {
	const [questions, setQuestions] = useState([]);
	const location = useLocation();
	const user = authService.getCurrentUser();
	const [imageURL, setImageURL] = useState(false);
	const [listQuestions, setListQuestions] = useState([]);
	const [, setLoading] = useState(false);
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};
	const createQuestionPath = `${location.pathname}/create`;

	useEffect(() => {
		getAllQA()
			.then((res) => {
				setQuestions(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		getAllQAByUserId(user.id).then((res) => {
			setListQuestions(res.result);
		});
	}, []);

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(false);
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, (imageUrl) => {
				setLoading(false);
				setImageURL(false);
			});
		}
	};

	const pencil = [
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' key={0}>
			<path
				d='M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z'
				className='fill-gray-7'></path>
			<path d='M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z' className='fill-gray-7'></path>
		</svg>,
	];

	const uploadButton = (
		<div className='ant-upload-text font-semibold text-dark'>
			{<VerticalAlignTopOutlined style={{ width: 20, color: '#000' }} />}
			<div>Upload New Project</div>
		</div>
	);

	return (
		<>
			<Card
				bordered={false}
				className='header-solid mb-24'
				title={
					<>
						<div>
							<h6 className='font-semibold'>Câu hỏi</h6>
							<p>Chia sẻ & học hỏi kiến thức</p>
						</div>

						<Row justify='end'>
							<NavLink to={createQuestionPath}>
								<Button type='primary'>Tạo câu hỏi</Button>
							</NavLink>
						</Row>
					</>
				}>
				<Row gutter={[24, 24]} className='question'>
					{listQuestions.map((p, index) => (
						<Col span={24} md={12} xl={6} key={index} className='h-full question-post'>
							<Card
								bordered={false}
								className='card-project'
								cover={<img alt='Thumnail' src={p.url} style={{ maxHeight: '180px', objectFit: 'cover' }} />}>
								<h5 className='card-tag'>{p.title}</h5>
								<p>{p.description}</p>
								<Row gutter={[6, 0]} className='card-footer'>
									{/* <Col span={12}>
										<Button type='button'>VIEW PROJECT</Button>
									</Col> */}
								</Row>
							</Card>
						</Col>
					))}
				</Row>
			</Card>
		</>
	);
}

export default Questions;
