import React, { useState } from "react";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { Card, Col, Row, Typography, Collapse, Button, Input } from "antd";
import {
  MenuUnfoldOutlined,
  DragOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined  
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
export default function CreateExam() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [questions, setQuestions] = React.useState(getItems(10));
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({
    question: null,
    option: null,
  });
  const [formData, setFormData] = React.useState({});
  const [loadingFormData, setLoadingFormData] = React.useState(true);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  function disabledRangeTime(_, type) {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ width: "100%" }}>
                  <DragOutlined
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      width: "100%",
                    }}
                    fontSize="small"
                  />
                  <Row span={24}>
                    <Col span={24}>
                      <Card
                        onClick={() => {
                          console.log("click");
                        }}
                        className=" full-width"
                      >
                        <Row>
                          <Col xs={24} md={10} className="m-10">
                            <h6 className="font-semibold">
                              Câu hỏi số {ques.id}
                            </h6>
                          </Col>
                          <Col xs={24} md={10} className="d-flex">
                            Điểm: <Input style={{ "width": "30px", "border-color":"none"}} />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={16} lg={16} xl={18}>
          <Card bordered={false} className="criclebox cardbody h-full">
            <div className="project-ant">
              <div className="width-100 hidden-overflow">
                <Title level={5}>Nội dung bài kiểm tra</Title>
                <Paragraph className="lastweek">
                  Cấu hình<span className="blue">40%</span>
                </Paragraph>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {questionsUI()}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
            <div className="ant-list-box table-responsive"></div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={6}>
          <Card bordered={false} className="criclebox">
            <div className="timeline-box">
              <Title level={5}>Cấu hình bài kiểm tra</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                Ấn lưu để hoàn tất quá trình tạo bài kiểm tra
              </Paragraph>
              <Space direction="vertical" size={12}>
                <RangePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledRangeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      moment("00:00:00", "HH:mm:ss"),
                      moment("11:59:59", "HH:mm:ss"),
                    ],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Space>
              ,
              <Button type="primary" className="width-100" onClick={() => {}}>
                {<MenuUnfoldOutlined />} Lưu
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
