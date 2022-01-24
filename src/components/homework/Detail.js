import React, { useEffect } from "react";
import { Tabs, Icon, Descriptions, Skeleton, Tag, Input, message } from "antd";
import Result from "./Result";

import {
  HomeOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  PieChartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import moment from "moment";
const { TabPane } = Tabs;

export default function Detail(props) {
  const { homework } = props;

  const tabChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={(e) => tabChange(e)}>
        <TabPane
          tab={
            <span>
              <HomeOutlined />
              Chi tiết
            </span>
          }
          key="1"
        >
          <Descriptions
            bordered
            title=""
            border
            size="small"
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Mã số">{homework._id}</Descriptions.Item>
            <Descriptions.Item label="Đường dẫn">
              <Input
                disabled={true}
                value={`user/conducttest?testid=`}
                addonAfter={
                  <div>
                    {/* <CopyToClipboard
                      text={`${this.state.mainlink}user/conducttest?testid=${id}`}
                      onCopy={() => message.success("Link Copied to clipboard")}
                    >
                      <Icon type="copy" />
                    </CopyToClipboard> */}
                  </div>
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="Tên bài kiểm tra">
              {homework.title}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {homework.description}
            </Descriptions.Item>
            <Descriptions.Item label="Loại">
              <span>
                {/* {testdetails.subjects.map((tag, i) => {
                  let color = "geekblue";
                  return (
                    <Tag color={color} key={tag._id}>
                      {tag.topic.toUpperCase()}
                    </Tag>
                  );
                })} */}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {moment(homework.createdAt).format("DD/ MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane
          tab={
            <span>
              <QuestionCircleOutlined />
              Đáp Án
            </span>
          }
          key="2"
        >
          {/* <Questions
              id={homework.testDetailsId}
              questionsOfTest={
                homework.testquestions
              }
              updateQuestiosnTest={this.props.updateQuestiosnActiveTest}
            /> */}
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Kết quả
            </span>
          }
          key="3"
        >
          <Result homework={homework} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PieChartOutlined />
              Thống Kê
            </span>
          }
          key="4"
        >
          {/* <Stats
            id={this.state.id}
            stats={this.state.stats}
            file={this.state.file}
            maxmMarks={this.state.maxMarks}
          /> */}
        </TabPane>
        <TabPane
          tab={
            <span>
              <MessageOutlined />
              Phản hồi
            </span>
          }
          key="5"
        >
          {/* <FeedBacks feedbacks={this.state.feedbacks} /> */}
        </TabPane>
      </Tabs>
    </div>
  );
}
