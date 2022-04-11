/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Row, Col, Card, Statistic, Button, Image } from 'antd';
import { PlusOutlined, ExclamationOutlined } from '@ant-design/icons';
import Course from './Course';

function Billing() {
	const courses = [
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/8.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/3.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/9.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/11.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/11.png',
		},
		{
			img: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
		},
	];

	return (
		<>
			<Row gutter={[24, 0]}>
				<Col xs={24}>
					<Row gutter={[24, 0]}>{courses && courses.map((el) => <Course img={el.img} />)}</Row>
				</Col>
			</Row>
		</>
	);
}

export default Billing;
