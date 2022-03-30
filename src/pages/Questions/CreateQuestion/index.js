import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats, modules } from '../../../utils/ReactQuill.config';
import { getAllQAByUserId, createQA } from '../../../services/questions.service';
import { authService } from '../../../services/auth.service';
import 'react-quill/dist/quill.snow.css';
import '../question.style.scss';

import { Row, Button, Col, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import CardQuestion from '../../../components/card/CardQuestion';
import { initial } from 'lodash';

function CreateQuestion() {
	const history = useHistory();
	const user = authService.getCurrentUser();
	const [listQuestions, setListQuestions] = useState([]);
	const [questionValue, setQuestionValue] = useState({
		title: 'ABC',
		desc: '',
		content: null,
	});
	const [images, setImages] = useState([]);

	const handleChangeQuestionTitle = (title) => {
		const val = title.target.value;
		setQuestionValue({ ...questionValue, title: val });
	};

	const handleChangeQuestionDesc = (desc) => {
		const val = desc.target.value;
		setQuestionValue({ ...questionValue, desc: val });
	};

	const handleChangeQuestionImg = ({ fileList }) => {
		setImages([...fileList]);
	};

	const handleChangeQuestionContent = (content) => {
		setQuestionValue({ ...questionValue, content });
	};

	useEffect(() => {
		getAllQAByUserId(user.id).then((res) => {
			setListQuestions(res.result);
		});
	}, [])
	 
	const handleCreateQA = async () => {
		const { title, desc, content } = questionValue;
	
		const data = {
			title,
			desc,
			content,
			images,
		};
console.log(data);
		await	createQA(data).then((res) => {
			if (res.status === 200) {
				history.push('/questions');
				message.success('Create question success');
			} else {
				message.error('Create question failed');
			}
		});
	}

	const props = {
		action: '',
		listType: 'picture',
		previewFile(file) {
			console.log('Your upload file:', file);
			// Your process logic. Here we just mock to the same file
			return fetch('https://api.json-generator.com/templates/KvMz6Zubh1xv/data', {
				headers: {
					'Content-Type': ' application/json',
					access_token: '4us718254sk7ils002z51n1n8r3qyae19i7zeyrt',
				},
				method: 'POST',
				body: file,
			})
				.then((res) => res.json())
				.then(({ thumbnail }) => thumbnail);
		},
	};

	const beforeUpload = () => {
		return false;
	};

	const posts = [
		{ id: 1, title: 'Hello World', desc: 'Welcome to learning React!' },
		{ id: 2, title: 'Installation', desc: 'You can install React from npm.' },
		{ id: 1, title: 'Hello World', desc: 'Welcome to learning React!' },
		{ id: 2, title: 'Installation', desc: 'You can install React from npm.' },
		{ id: 1, title: 'Hello World', desc: 'Welcome to learning React!' },
		{ id: 2, title: 'Installation', desc: 'You can install React from npm.' },
		{ id: 1, title: 'Hello World', desc: 'Welcome to learning React!' },
		{ id: 2, title: 'Installation', desc: 'You can install React from npm.' },
		{ id: 1, title: 'Hello World', desc: 'Welcome to learning React!' },
		{ id: 2, title: 'Installation', desc: 'You can install React from npm.' },
	];

	return (
		<>
			<Row className='question' justify='space-between' style={{ height: '70vh' }}>
				<Col span={16} value='middle'>
					<Col>
						<div>
							<h3>Tiêu đề</h3>
							<Input type='text' placeholder='Tiêu đề câu hỏi' value={questionValue.title.value} onChange={handleChangeQuestionTitle} />
						</div>
					</Col>
					<Col>
						<div>
							<h3>Mô tả câu hỏi</h3>
							<Input type='text' placeholder='Tiêu đề câu hỏi' value={questionValue.desc.value} onChange={handleChangeQuestionDesc} />
						</div>
					</Col>
					<Col>
						<h3>Hình ảnh</h3>
						<Upload listType='picture' fileList={images} onChange={handleChangeQuestionImg} beforeUpload={beforeUpload}>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
					</Col>
					<div className='question_content'>
						<EditorToolbar />
						<ReactQuill
							theme='snow'
							value={questionValue.content}
							onChange={handleChangeQuestionContent}
							placeholder={'Nội dung cần tạo ...'}
							modules={modules}
							formats={formats}
						/>
					</div>
				</Col>
				<Col className='question_list' span={6} style={{ height: '100%' }}>
					<h3>Danh sách câu hỏi của bạn</h3>
					<div style={{ overflow: 'scroll', height: '100%' }}>
						{posts.map((el) => (
							<Row style={{ marginBottom: '20px' }}>
								<CardQuestion key={el.id} title={el.title} desc={el.desc} />
							</Row>
						))}
					</div>
				</Col>
			</Row>
			<Row>
				<Col span={16}>
					<Row justify='end' style={{ marginTop: '20px' }}>
						<Button onClick={handleCreateQA} type='primary'>
							Tạo câu hỏi
						</Button>
					</Row>
				</Col>
				<Col span={6}></Col>
			</Row>
		</>
	);
}

export default CreateQuestion;
