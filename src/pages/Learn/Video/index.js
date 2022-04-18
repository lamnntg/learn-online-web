import React from 'react';
import { Card, Col, Row, Typography, Tooltip, Progress, Upload, message, Button, Timeline, Radio } from 'antd';
import { ToTopOutlined, MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';

const CourseVideo = () => {
  const { Title, Text } = Typography;
  const converPath = path => {
    return path.replace('watch?v=', 'embed/');
  };

  const dummyData = [
    {
      id: 0,
      title: 'Mô hình Client - Server là gì?',
      url: 'https://youtu.be/CIIYogDrGto?list=PL_-VfJajZj0VkWYODGeMuraS8V7xaOZM8',
      time: '10:30'
    },
    {
      id: 1,
      title: 'Domain là gì? Tên miền là gì? ',
      url: 'https://youtu.be/XJiq_d0vGCQ?list=PL_-VfJajZj0VkWYODGeMuraS8V7xaOZM8',
      time: '10:34'
    }
  ];

  return (
    <>
      {/* <Row className="h-full">
        <Col span={18} className="h-full">
          <Row className="h-full">
            <iframe
              width="100%"
              height="70%"
              src={converPath('https://www.youtube.com/watch?v=M62l1xA5Eu8')}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
            <Row>
              <h2 align="left" variant="h4">
                Domain là gì? Tên miền là gì?
              </h2>
            </Row>
          </Row>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="criclebox h-full">
            <div className="timeline-box">
              <Title level={5}>Orders History</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                this month <span className="bnb2">20%</span>
              </Paragraph>

              <Timeline pending="Recording..." className="timelinelist">
                {dummyData.map((t, index) => (
                  <Timeline.Item key={index}>
                    <Title level={5}>{t.title}</Title>
                    <Text>{t.time}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              <Button type="primary" className="width-100" onClick={() => setReverse(!reverse)}>
                {<MenuUnfoldOutlined />} REVERSE
              </Button>
            </div>
          </Card>
        </Col>
      </Row> */}
      <Row gutter={[24, 0]} className="h-full">
        <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24 h-full">
          <div className="h-full">
            {/* <div className="project-ant h-full">
              <div>
                <Title level={5}>Projects</Title>
                <Paragraph className="lastweek">
                  done this month<span className="blue">40%</span>
                </Paragraph>
              </div>
              <div className="ant-filtertabs">
                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra"></div>
              </div>
            </div> */}
            <div>
              <Title level={5}>Domain là gì? Tên miền là gì?</Title>
              <Paragraph className="lastweek">
                done this month<span className="blue">40%</span>
              </Paragraph>
            </div>
            <div className="h-full">
              <iframe
                width="100%"
                height="70%"
                src={converPath('https://www.youtube.com/watch?v=M62l1xA5Eu8')}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <div className="timeline-box">
              <Title level={5}>Orders History</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                this month <span className="bnb2">20%</span>
              </Paragraph>

              <Timeline pending="Recording..." className="timelinelist">
                {dummyData.map((t, index) => (
                  <Timeline.Item key={index}>
                    <Title level={5}>{t.title}</Title>
                    <Text>{t.time}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              {/* <Button type="primary" className="width-100" onClick={() => setReverse(!reverse)}>
              {<MenuUnfoldOutlined />} REVERSE
            </Button> */}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CourseVideo;

