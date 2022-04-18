import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'antd';

import './Course.style.scss';

const Course = props => {
  const location = useLocation();
  const { img, path } = props;

  const redirectCourse = path => {
    return `${location.pathname}/${path}`;
  };

  return (
    <>
      <Col xs={12} xl={6} className="mb-24">
        <NavLink to={redirectCourse(path)}>
          <Card bordered={false} className="widget-2 h-full course" height={200}>
            <div className="course-title">Xem khóa học</div>
            <div className="course-img" height={200}>
              <img className="img" src={img} alt="" />
            </div>
          </Card>
        </NavLink>
      </Col>
    </>
  );
};

export default Course;

