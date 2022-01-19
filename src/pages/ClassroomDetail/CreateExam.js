import React, { useState, useEffect } from "react";
import "./classroomDetail.css";
import Operations from "../../components/Exam/Operations";

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
const listAnswers = ["A", "B", "C", "D", "E"];
const { confirm } = Modal;

export default function CreateExam(params, props) {
  const history = useHistory();
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
  const [isBlocking, setIsBlocking] = useState(true);

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

  //redirect to another page
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (isBlocking) {
        return window.confirm("Bạn chắc chắn muốn nộp bài làm?");
      }
      return true;
    });

    window.onbeforeunload = function () {
      if (isBlocking) {
        return window.confirm("Bạn chắc chắn muốn nộp bài làm?");
      }
    };

    return () => {
      unblock();
    };
  }, []);

  useEffect(() => {
    getHomeworkDetail(homeworkId)
      .then((res) => {
        const homeworkInfor = {
          ...res,
        };
        delete homeworkInfor.questions;

        setHomeworkInfo(homeworkInfor);
        setQuestions(res.questions);

        var newAnswers = [];
        res.questions.forEach((ques, i) => {
          newAnswers.push({
            question_id: ques._id,
            answers: Array.from(ques.answers, (element) => {
              return {
                ...element,
                selected: false,
              };
            }),
          });
        });
        setAnswers(newAnswers);
        setCountDown({ minutes: homeworkInfor.time, seconds: 0 });

        setIsLoading(false);
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
                        <h6 className="font-semibold font-16">
                          Câu hỏi số {i + 1} : {ques.question}
                        </h6>
                      </Col>
                      {ques.url !== "" ? (
                        <img
                          src={ques.url}
                          width="350px"
                          height="auto"
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </Row>
                    <Row span={24} md={16}>
                      <Col span={24} md={16}>
                        <div>
                          {ques.answers.map((ans, j) => (
                            <>
                              <div
                                style={{
                                  padding: "0px 15px",
                                }}
                              >
                                <div>
                                  <b>
                                    {listAnswers[j]}
                                    {"  :  "}
                                  </b>
                                  {ans.answer}
                                </div>
                                {ans.url !== "" ? (
                                  <img
                                    style={{
                                      display: "block",
                                    }}
                                    src={ans.url}
                                    width="350px"
                                    height="auto"
                                    alt=""
                                  />
                                ) : (
                                  ""
                                )}
                                <br></br>
                              </div>
                            </>
                          ))}
                        </div>

                        <Divider></Divider>

                        <Row
                          justify="start"
                          align="middle"
                          style={{ padding: "0 20px" }}
                        >
                          <b style={{ paddingRight: "30px" }}>
                            Chọn câu trả lời:
                          </b>
                          {answers[i].answers.map((ans, j) => (
                            <Col span={3}>
                              <Button style={{ backgroundColor: "white" }}>
                                {listAnswers[j]}
                              </Button>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <Divider></Divider>
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
                <Card bordered={true} className="criclebox cardbody h-full">
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
                    {/* <div className="side-panel-in-exam-dashboard w-20"> */}
                    <div className="loggedin-trainee-container">
                      <div className="loggedin-trainee-inner">
                        <img
                          alt="User Icon"
                          src="#"
                          className="loggedin-trainee-logo"
                        />
                        <div className="loggedin-trainee-details-container">
                          <p>Tên người làm bài</p>
                        </div>
                      </div>
                    </div>
                    <Operations questions={questions} setAnswers={setAnswers} />
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
