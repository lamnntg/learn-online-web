import React from "react";
import { Tabs, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
export default function NavBar() {
  const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  };
  
  return (
    <div>
      <Menu
        // onClick={}
        selectedKeys={['mail']}
        mode="horizontal"
        style={centerStyle}
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Bảng tin
        </Menu.Item>

        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Bài tập trên lớp
        </Menu.Item>

        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mọi người
          </a>
        </Menu.Item>

        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Cài đặt"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}
