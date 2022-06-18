import { Row, Col } from 'antd';
import { ThemeProvider, Typography } from '@material-ui/core';
import Course from './Course';

function Billing() {
  const courses = [
    {
      id: 0,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
      path: 'lessons-for-newbie'
    },
    {
      id: 1,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/8.png',
      path: ''
    },
    {
      id: 2,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/3.png',
      path: ''
    },
    {
      id: 3,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/9.png',
      path: ''
    },
    {
      id: 4,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/11.png',
      path: ''
    },
    {
      id: 5,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
      path: ''
    },
    {
      id: 6,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/11.png',
      path: ''
    },
    {
      id: 7,
      img: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
      path: ''
    }
  ];

  return (
    <>
      <ThemeProvider>
        <Typography variant="h4">Khóa học</Typography>
        <Typography variant="h6">Các bài học được phát triển phù hợp với từ cơ bản đến nâng cao.</Typography>
      </ThemeProvider>
      <Row gutter={[24, 0]} style={{ marginTop: '30px' }}>
        <Col xs={24}>
          <Row gutter={[24, 0]}>{courses && courses.map(el => <Course img={el.img} path={el.path} key={el.id} />)}</Row>
        </Col>
      </Row>
    </>
  );
}

export default Billing;

