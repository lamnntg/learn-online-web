// import { useState } from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  VideoCameraOutlined,
  UserOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  TableOutlined,
  BookOutlined,
  BulbOutlined,
  ProjectOutlined
} from '@ant-design/icons';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const { isLoggedIn } = useSelector(state => state.auth);

  const rtl = [
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}></path>
    </svg>
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span style={{ paddingLeft: '10px' }}>Learn Online</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="db" style={{ marginBottom: '10px' }}>
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === 'dashboard' ? color : ''
              }}>
              {<DashboardOutlined />}
            </span>
            <span className="label">Trang chủ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="classroom" style={{ marginBottom: '10px' }}>
          <NavLink to="/classroom">
            <span
              className="icon"
              style={{
                background: page === 'classroom' ? color : ''
              }}>
              {<BookOutlined />}
            </span>
            <span className="label">Lớp học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="learn" style={{ marginBottom: '10px' }}>
          <NavLink to="/learn">
            <span
              className="icon"
              style={{
                background: page === 'learn' ? color : ''
              }}>
              {<BulbOutlined />}
            </span>
            <span className="label">Học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="questions" style={{ marginBottom: '10px' }}>
          <NavLink to="/questions">
            <span
              className="icon"
              style={{
                background: page === 'questions' ? color : ''
              }}>
              {<ProjectOutlined />}
            </span>
            <span className="label">Câu hỏi</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="rtl">
          <NavLink to="/rtl">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {rtl}
            </span>
            <span className="label">RTL</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item className="menu-item-header" key="5" style={{ marginBottom: '10px' }}>
          Trang cá nhân
        </Menu.Item>
        <Menu.Item key="profile" style={{ marginBottom: '10px' }}>
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === 'profile' ? color : ''
              }}>
              {<UserOutlined />}
            </span>
            <span className="label">Trang cá nhân</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5" style={{ marginBottom: '10px' }}>
          Phòng họp
        </Menu.Item>
        <Menu.Item key="meeting1" style={{ marginBottom: '10px' }}>
          <NavLink to="/meeting">
            <span className="icon">{<VideoCameraOutlined />}</span>
            <span className="label">Meeting</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item className="menu-item-header" key="8">
          Classrooms
        </Menu.Item>
        <Menu.Item key="meeting2">
          <NavLink to="/meeting">
            <span className="icon">C1</span>
            <span className="label">Lớp học 1</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="meeting3">
          <NavLink to="/meeting">
            <span className="icon">C2</span>
            <span className="label">Lớp học 2</span>
          </NavLink>
        </Menu.Item> */}
        {/*<Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;

