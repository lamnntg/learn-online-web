import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats, modules } from '../../../utils/ReactQuill.config';
import 'react-quill/dist/quill.snow.css';
import '../question.style.scss';

import { Row, Button, Col, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import CardQuestion from '../../../components/card/CardQuestion';

function CreateQuestion() {
	const [state, setState] = useState({ value: null });
	const handleChange = (value) => {
		setState({ value });
	};

	const props = {
		action: '//jsonplaceholder.typicode.com/posts/',
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
							<Input type='text' placeholder='Tiêu đề câu hỏi' />
						</div>
					</Col>
					<Col>
						<div>
							<h3>Mô tả câu hỏi</h3>
							<Input type='text' placeholder='Tiêu đề câu hỏi' />
						</div>
					</Col>
					<Col>
						<h3>Hình ảnh</h3>
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
					</Col>
					<div className='question_content'>
						<EditorToolbar />
						<ReactQuill
							theme='snow'
							value={state.value}
							onChange={handleChange}
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
						<Button type='primary'>Tạo câu hỏi</Button>
					</Row>
				</Col>
				<Col span={6}></Col>
			</Row>
		</>
	);
}

export default CreateQuestion;
