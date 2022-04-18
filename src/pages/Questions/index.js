import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Row, Col, Card, Button, Avatar, Upload, message } from 'antd';

import { VerticalAlignTopOutlined } from '@ant-design/icons';

import BgProfile from '../../assets/images/bg-profile.jpg';
import profilavatar from '../../assets/images/face-1.jpg';
import convesionImg from '../../assets/images/face-3.jpg';
import convesionImg2 from '../../assets/images/face-4.jpg';
import convesionImg3 from '../../assets/images/face-5.jpeg';
import convesionImg4 from '../../assets/images/face-6.jpeg';
import convesionImg5 from '../../assets/images/face-2.jpg';
import project1 from '../../assets/images/home-decor-1.jpeg';
import project2 from '../../assets/images/home-decor-2.jpeg';
import project3 from '../../assets/images/home-decor-3.jpeg';

function Questions() {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const createQuestionPath = `${location.pathname}/create`;

  const beforeUpload = file => {
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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"></path>
      <path d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" className="fill-gray-7"></path>
    </svg>
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: '#000' }} />}
      <div>Upload New Project</div>
    </div>
  );

  const project = [
    {
      img: project1,
      titlesub: 'Project #1',
      title: 'Modern',
      description: 'As Uber works through a huge amount of internal management turmoil.'
    },
    {
      img: project2,
      titlesub: 'Project #2',
      title: 'Scandinavian',
      description: 'Music is something that every person has his or her own specific opinion about.'
    },
    {
      img: project3,
      titlesub: 'Project #3',
      title: 'Minimalist',
      description: 'Different people have different taste, and various types of music, Zimbali Resort'
    },
    {
      img: project3,
      titlesub: 'Project #3',
      title: 'Minimalist',
      description: 'Different people have different taste, and various types of music, Zimbali Resort'
    },
    {
      img: project3,
      titlesub: 'Project #3',
      title: 'Minimalist',
      description: 'Different people have different taste, and various types of music, Zimbali Resort'
    }
  ];

  return (
    <>
      <Row justify="end">
        <NavLink to={createQuestionPath}>
          <Button type="primary">Tạo câu hỏi</Button>
        </NavLink>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Câu hỏi</h6>
            <p>Chia sẻ & học hỏi kiến thức</p>
          </>
        }>
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card bordered={false} className="card-project" cover={<img alt="example" src={p.img} />}>
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.description}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          {/* <Col span={24} md={12} xl={6}>
						<Upload
							name='avatar'
							listType='picture-card'
							className='avatar-uploader projects-uploader'
							showUploadList={false}
							action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
							beforeUpload={beforeUpload}
							onChange={handleChange}>
							{imageURL ? <img src={imageURL} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
						</Upload>
					</Col> */}
        </Row>
      </Card>
    </>
  );
}

export default Questions;

