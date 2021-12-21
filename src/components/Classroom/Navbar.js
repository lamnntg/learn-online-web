import React from "react";
import { Tabs, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { ROLE_MODERATOR } from "../../utils/constants";

import {
  ReadOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

export default function NavBar(props) {
  const centerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  };

  const selectedKeys = props.tab;

  let news = "/classroom/" + props.id;
  let homeworks = "/classroom/" + props.id + "/homework";
  let people = "/classroom/" + props.id + "/people";
  let setting = "/classroom/" + props.id + "/setting";

  const currentUser = authService.getCurrentUser();
  const isModerator = currentUser.roles.includes(ROLE_MODERATOR);

  return (
    <div>
      <Menu
        // onClick={}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
        style={centerStyle}
      >
        <Menu.Item key="news" icon={<HomeOutlined />}>
          <NavLink to={news}>Bảng tin</NavLink>
        </Menu.Item>

        <Menu.Item key="homeworks" icon={<ReadOutlined />}>
          <NavLink to={homeworks}>Bài tập trên lớp</NavLink>
        </Menu.Item>

        <Menu.Item key="people" icon={<UserOutlined />}>
          <NavLink to={people}>Mọi người</NavLink>
        </Menu.Item>

        {isModerator ?? isModerator ? (
          <Menu.Item key="setting" icon={<SettingOutlined />}>
            <NavLink to={setting}>Cài đặt</NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item disabled key="setting" icon={<SettingOutlined />}>
            <NavLink to={setting}>Cài đặt</NavLink>
          </Menu.Item>
        )}
        
        {/* <SubMenu disabled key="SubMenu" icon={<SettingOutlined />} title="Cài đặt">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}
      </Menu>
    </div>
  );
}
