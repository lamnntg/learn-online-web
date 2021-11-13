import React, { useState } from "react";
import { Skeleton, Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

export default function Classroom() {
  let loading = false;

  return (
    <div className="main">
      <div className="main__header">
        
      </div>
      <div className="main-content">
        <Card
          hoverable
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
          onClick={() => {
            console.log("click");
          }}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
}
