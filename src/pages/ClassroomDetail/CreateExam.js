import React, { useState, useEffect } from "react";
import "./classroomDetail.css";
import moment from "moment";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Skeleton,
  Divider,
  Checkbox,
  Space,
  Tag,
  Spin,
  Modal,
} from "antd";

import {
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import shortid from "shortid";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";
import { getHomeworkDetail } from "../../services/homework.service";
const { Title, Text } = Typography;
const { CheckableTag } = Tag;
const listAnswers = ["A", "B", "C", "D", "E"];
const { confirm } = Modal;

export default function CreateExam(params) {
  const history = useHistory();

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const classroom = useClassroom(params.match.params.id);
  const homeworkId = params.match.params.homeworkId;
  const [countDown, setCountDown] = useState({
    minutes: null,
    seconds: null,
  });

  const [questions, setQuestions] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [startModalVisiable, setStartModalVisiable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [homeworkInfo, setHomeworkInfo] = useState({});
  const [answers, setAnswers] = useState([]);

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStart === true) {
        let minute = countDown.minutes;
        let second = countDown.seconds;
        if (minute === 0 && second === 1) {
          clearInterval(interval);
          // this.endTest();
        } else {
          if (second === 0) {
            second = 59;
            minute = minute - 1;
          } else {
            second = second - 1;
          }
          setCountDown({
            minutes: minute,
            seconds: second,
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (startModalVisiable === false && isStart === false) {
      history.push(`/classroom/${classroom._id}`);
    }
  }, [startModalVisiable, isStart]);

  useEffect(() => {
    getHomeworkDetail(homeworkId)
      .then((res) => {
        const homeworkInfor = {
          ...res,
        };
        delete homeworkInfor.questions;

        setHomeworkInfo(homeworkInfor);
        setQuestions(res.questions);
        setCountDown({ minutes: homeworkInfor.time, seconds: 0 });

        setIsLoading(false);
        console.log(homeworkInfor);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, [homeworkId]);

  const ModalStartUI = () => {
    return (
      <Modal
        title={`Bắt đầu bài thi: `}
        visible={startModalVisiable}
        onOk={() => {
          setTimeout(() => {
            setIsStart(true);
            setStartModalVisiable(false);
          }, 3000);
        }}
        onCancel={() => {
          setStartModalVisiable(false);
        }}
        okText={"Bắt đầu"}
        cancelText="Quay lại"
      >
        <h3>
          <ExclamationCircleOutlined /> Lưu ý:
        </h3>
        <p>+ Chuẩn bị đầy đủ dụng cụ để bắt đầu làm bài.</p>
        <p>+ Bài thi sẽ được bắt đầu sau 3 giây.</p>
        <p>+ Hết thời gian bài thi sẽ tự động nộp bài.</p>
        <Spin indicator={loadingIcon} />
      </Modal>
    );
  };

  function questionsUI() {
    return (
      questions &&
      questions.map((ques, i) => (
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
                        <h6 className="font-semibold">Câu hỏi số {i + 1} :</h6>
                      </Col>
                      <Col xs={24} md={6} className="d-flex"></Col>
                    </Row>
                    <b>{ques.question}</b>
                    <Row span={24}>
                      <Col xs={24} md={24}>
                        <div>
                          <div>
                            {ques.answers.map((ans, j) => (
                              <>
                                {ans.answer}
                                <br></br>
                              </>
                            ))}
                            <Divider orientation="right"></Divider>
                            <div
                              className="controller"
                              style={{ width: "90%" }}
                            >
                              Chọn câu trả lời:
                              {ques.answers.map((ans, j) => (
                                <>
                                  <CheckableTag
                                    key={ans}
                                    checked={listAnswers[j].indexOf(ans) > -1}
                                    onChange={(checked) => {}}
                                  >
                                    {listAnswers[j]}
                                  </CheckableTag>
                                  {/* <Button>{listAnswers[j]}</Button> */}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ))
    );
  }

  return (
    <div>
      {!isLoading ? (
        <>
          <Skeleton loading={!isStart} active>
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
                      <Button
                        type="primary"
                        onClick={() => {
                          setQuestions([
                            ...questions,
                            {
                              id: shortid.generate(),
                              question: "",
                              answers: [],
                            },
                          ]);
                        }}
                      >
                        Nộp bài
                      </Button>
                    </div>
                  </div>
                  <div className="ant-list-box table-responsive"></div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Card bordered={false} className="criclebox">
                  <div className="timeline-box">
                    <Title level={5}>{homeworkInfo.title}</Title>
                    <Paragraph
                      className="lastweek"
                      style={{ marginBottom: 24 }}
                    >
                      {homeworkInfo.description}
                    </Paragraph>
                    <div className="clock-wrapper">
                      <div className="clock-container">
                        {countDown.minutes === 0 &&
                        countDown.seconds === 0 ? null : (
                          <h1>
                            {" "}
                            {countDown.minutes < 10
                              ? `0${countDown.minutes}`
                              : countDown.minutes}
                            :
                            {countDown.seconds < 10
                              ? `0${countDown.seconds}`
                              : countDown.seconds}
                          </h1>
                        )}
                      </div>
                    </div>
                    <Space direction="vertical" size={12}></Space>

                    <Button
                      type="primary"
                      className="width-100"
                      onClick={() => {
                        setIsStart(!isStart);
                      }}
                    >
                      {<MenuUnfoldOutlined />} Nộp bài
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Skeleton>
          {ModalStartUI()}
        </>
      ) : (
        <Space size="middle" className="loading">
          <Spin size="large" />
        </Space>
      )}
    </div>
  );
}
