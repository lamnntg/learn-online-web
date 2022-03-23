import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../question.style.scss';

import { Row, Button } from 'antd';

function CreateQuestion() {
	const [value, setValue] = useState('');

	return (
		<>
			<div className='question'>
				<ReactQuill theme='snow' value={value} onChange={setValue} />
			</div>
			<Row justify='end' style={{ marginTop: '20px' }}>
				<Button type='primary'>Tạo câu hỏi</Button>
			</Row>
		</>
	);
}

export default CreateQuestion;
