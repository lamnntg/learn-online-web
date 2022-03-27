import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats, modules } from '../../../utils/ReactQuill.config';
import 'react-quill/dist/quill.snow.css';

import '../question.style.scss';

import { Row, Button } from 'antd';

function CreateQuestion() {
	const [state, setState] = useState({ value: null });
	const handleChange = (value) => {
		setState({ value });
	};

	return (
		<>
			<div className='question'>
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
			<Row justify='end' style={{ marginTop: '20px' }}>
				<Button type='primary'>Tạo câu hỏi</Button>
			</Row>
		</>
	);
}

export default CreateQuestion;
