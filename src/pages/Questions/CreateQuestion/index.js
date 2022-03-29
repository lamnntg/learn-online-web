import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats, modules } from '../../../utils/ReactQuill.config';
import 'react-quill/dist/quill.snow.css';
import './index.style.scss';

import '../question.style.scss';

import { Row, Button, Col, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

	return (
		<>
			{/* <div className='question'>
				<div className='question-init'>
					<div className='question-header'>
						<div className='question-title'>
							<h3>Tiêu đề:</h3>
							<h3>Mô tả:</h3>
						</div>
					</div>
					<div className='question-info'>
						<div>
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
					</div>
				</div>
				<div className='question-history'></div>
			</div> */}
			<Row>
				<Col span={18}>
					<Col>
						<div className='question-title'>
							<h3>Tiêu đề</h3>
							<Input type='text' placeholder='Tiêu đề câu hỏi' />
						</div>
					</Col>
					<Col>
						<div className='question-title'>
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
					<div>
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
				<Col span={6}>
					<p>Danh sách câu hỏi của bạn</p>
				</Col>
			</Row>

			<Row justify='end' style={{ marginTop: '20px' }}>
				<Button type='primary'>Tạo câu hỏi</Button>
			</Row>
		</>
	);
}

export default CreateQuestion;
