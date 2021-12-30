import React, { useState } from "react";
import moment from "moment";
import { DatePicker, Space } from "antd";
import {
  Card,
  Col,
  Row,
  Typography,
  Collapse,
  Button,
  Input,
  Form,
  Divider,
} from "antd";

import {
  MenuUnfoldOutlined,
  DragOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import Paragraph from "antd/lib/typography/Paragraph";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { TextArea } = Input;

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const deleteIcon = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      className="fill-gray-7"
    ></path>
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      className="fill-gray-7"
    ></path>
  </svg>,
];

export default function CreateExam() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [form] = Form.useForm();

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

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const listAnswers = ["A", "B", "C", "D", "E"];

  function questionsUI() {
    return questions.map((ques, i) => (
      <div>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ width: "100%" }}>
            <Row span={24}>
              <Col span={24}>
                <Card
                  onClick={() => {
                    console.log("click");
                  }}
                  className=" full-width"
                  style={{
                    backgroundColor: "rgb(250, 250, 250)",
                    borderRadius: "10px",
                  }}
                >
                  <Row className="ph-24">
                    <Col xs={24} md={16}>
                      <h6 className="font-semibold">Câu hỏi số {i + 1}</h6>
                    </Col>
                    <Col xs={24} md={6} className="d-flex">
                      Điểm :{``}
                      <Input
                        style={{
                          width: "40px",
                          height: "30px",
                          borderColor: "transparent",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row span={24}>
                    <Col xs={24} md={24}>
                      <div>
                        <Form
                          name="dynamic_form_item"
                          {...formItemLayout}
                          onFinish={onFinish}
                        >
                          <Form.List name="names">
                            {(fields, { add, remove }, { errors }) => (
                              <>
                                <Form.Item style={{ textAlign: "center" }}>
                                  <TextArea
                                    placeholder="Nhập nội dung câu hỏi"
                                    allowClear
                                    onChange={onChange}
                                    style={{ width: "90%" }}
                                  />
                                </Form.Item>
                                {fields.map((field, index) => (
                                  <Form.Item
                                    {...formItemLayout}
                                    label={<b>{listAnswers[index]}</b>}
                                    required={false}
                                    key={field.key}
                                  >
                                    <Form.Item
                                      {...field}
                                      validateTrigger={["onChange", "onBlur"]}
                                      rules={[
                                        {
                                          required: true,
                                          whitespace: true,
                                          message: "Vui lòng nhập câu trả lời",
                                        },
                                      ]}
                                      noStyle
                                    >
                                      <Input
                                        placeholder="Đáp án"
                                        style={{ width: "80%" }}
                                      />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                      <Button
                                        type="link"
                                        className="ant-edit-link"
                                        onClick={() => remove(field.name)}
                                      >
                                        {deleteIcon}
                                      </Button>
                                    ) : null}
                                  </Form.Item>
                                ))}
                                <Divider orientation="right"></Divider>

                                <div
                                  className="controller"
                                  style={{ width: "90%" }}
                                >
                                  <Form.Item>
                                    <Button
                                      disabled={fields.length >= 5}
                                      type="dashed"
                                      onClick={() => add()}
                                      icon={<PlusOutlined />}
                                    >
                                      Thêm đáp án
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                  </Form.Item>
                                </div>
                              </>
                            )}
                          </Form.List>
                          {/* <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item> */}
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
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

                <div>{questionsUI()}</div>
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
