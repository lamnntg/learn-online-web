import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Avatar, Divider, message, Button, Modal, Descriptions } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/Classroom/Navbar';
import classroomImg from '../../assets/images/classroom.jpg';
import useClassroom from '../../hooks/useClassroom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './classroom.scss';

import {
	getClassroomNotifications,
	createClassroomNotifications,
	updateClassroomNotifications,
	deleteClassroomNotifications,
} from '../../services/classroom.service';
import Moment from 'react-moment';
import { authService } from '../../services/auth.service';
import { clone } from 'lodash';
const { confirm } = Modal;

export default function ClassroomDetail(props) {
	let { id } = useParams();
	const { Title, Text, Paragraph } = Typography;
	const [value, setValue] = useState('');
	const [visible, setVisible] = useState(false);
	const [visibleEdit, setVisibleEdit] = useState(false);
	const [valueEdit, setValueEdit] = useState('');
	const [idEdit, setIdEdit] = useState('');

	const classroom = useClassroom(id);
	const [data, setData] = useState([]);
	const currentUser = authService.getCurrentUser();

	useEffect(() => {
		getClassroomNotifications(id)
			.then((res) => {
				setData(res.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	const handleCreateNotification = async () => {
		setVisible(false);
		const notification = {
			author_id: currentUser.id,
			content: value,
			author_name: currentUser.name,
			avatar_url: currentUser.avatar_url,
		};

		createClassroomNotifications(id, notification)
			.then((res) => {
				data.unshift(res);
				setData(data);
				message.success('Thông báo đã được tạo thành công');
				setValue('');
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
				message.error('Thông báo đã được tạo thất bại');
			});
	};

	const handleEditNotification = async () => {
		setVisible(false);
		const notification = {
			content: valueEdit,
		};
		updateClassroomNotifications(idEdit, notification)
			.then((res) => {
				var newData = clone(data);
				var foundIndex = newData.findIndex((x) => x._id === idEdit);
				newData[foundIndex].content = notification.content;
				setData(newData);
				setVisibleEdit(false);
				setIdEdit('');
				message.success('Thông báo đã được cập nhật');
			})
			.catch((err) => {
				console.log(err);
				message.error('Cập nhật thông báo thất bại');
			});
	};

	function showDeleteConfirm(item) {
		confirm({
			title: 'Bạn chắc chắn muốn xóa thông báo này ?',
			icon: <ExclamationCircleOutlined />,
			content: `Thông báo của ${item.author_name} sẽ bị xóa vĩnh viễn`,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				var deleteId = item._id;
				deleteClassroomNotifications(item._id)
					.then((res) => {
						console.log(res);
						var newData = data.filter(function (obj) {
							return obj._id !== deleteId;
						});
						setData(newData);

						message.success('Xóa thông báo thành công');
					})
					.catch((err) => {
						console.log(err);
						message.error('Xóa thông báo thất bại');
					});
			},
			onCancel() {
				console.log(item);
				console.log('Cancel');
			},
		});
	}

	return (
		<div>
			<NavBar id={id} tab='news' />
			<div>
				<Row gutter={[24, 0]} justify='center'>
					<Col>
						<Card bordered={true} className='criclebox h-full'>
							<Row gutter>
								<Col xs={24} md={12} sm={24} lg={12} xl={14} className='mobile-24'>
									<div className='h-full col-content p-20'>
										<div className='ant-muse'>
											<Text>Lớp học</Text>
											<Title level={5}>Tên lớp : {classroom.name}</Title>
											<Paragraph className='lastweek mb-36' style={{ width: '50vw' }}>
												Môn học : {classroom.subject} - Phòng : {classroom.room}
											</Paragraph>
										</div>
										<Row gutter={[16, 16]} style={{ fontWeight: 'bold' }}>
											<Col>Mã lớp :</Col>
											<Col>
												<Paragraph copyable>{classroom.code}</Paragraph>
											</Col>
										</Row>
									</div>
								</Col>
								<Col xs={24} md={12} sm={24} lg={12} xl={10} className='col-img'>
									<div className='ant-cret text-right'>
										<img src={classroomImg} alt='' className='border10' />
									</div>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>

			<Divider orientation='right'></Divider>
			<Col span={24} md={24}>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<Row>
							<Col span={8}>
								<h6 className='font-semibold m-0'>Thông báo lớp học</h6>
							</Col>
							<Col span={8} offset={8}>
								<Row justify='end'>
									<Button shape='circle' icon={<PlusCircleOutlined />} style={{ marginRight: '50px' }} onClick={() => setVisible(true)}>
										Tạo thông báo
									</Button>
								</Row>
							</Col>
						</Row>,
					]}
					bodyStyle={{ paddingTop: '0' }}>
					<Row gutter={[24, 24]}>
						{data.map((item, index) => (
							<Col span={24} key={index}>
								<Card className='card-billing-info' bordered='false'>
									<div className='col-info'>
										<Descriptions
											title={
												<div>
													<Avatar src={'https://joeschmoe.io/api/v1/random'} style={{ marginRight: '10px' }} />
													{item.author_name}
													<span
														style={{
															fontWeight: 'lighter',
															marginLeft: '20px',
														}}>
														{
															<i>
																<Moment format='YYYY-MM-DD HH:mm'>{item.createdAt}</Moment>
															</i>
														}
													</span>
												</div>
											}>
											<Descriptions.Item>
												<div dangerouslySetInnerHTML={{ __html: item.content }} />
											</Descriptions.Item>
										</Descriptions>
									</div>
									<div className='col-action'>
										<Button
											type='link'
											danger
											onClick={(e) => {
												showDeleteConfirm(item);
											}}>
											{<DeleteOutlined />}DELETE
										</Button>
										<Button
											type='link'
											className='darkbtn'
											onClick={() => {
												setVisibleEdit(true);
												setValueEdit(item.content);
												setIdEdit(item._id);
											}}>
											{<EditOutlined />} EDIT
										</Button>
									</div>
								</Card>
							</Col>
						))}
					</Row>
				</Card>
			</Col>
			<Modal
				title='Tạo thông báo cho lớp học'
				centered
				visible={visible}
				onOk={() => {
					handleCreateNotification();
				}}
				onCancel={() => setVisible(false)}
				width={1000}>
				<div className='classroom'>
					<ReactQuill theme='snow' value={value} onChange={setValue} />
				</div>
			</Modal>

			<Modal
				title='Chỉnh sửa thông báo cho lớp học'
				centered
				visible={visibleEdit}
				onOk={() => {
					handleEditNotification();
				}}
				onCancel={() => setVisibleEdit(false)}
				width={1000}>
				<div className='classroom'>
					<ReactQuill theme='snow' value={valueEdit} onChange={setValueEdit} />
				</div>
			</Modal>
		</div>
	);
}
