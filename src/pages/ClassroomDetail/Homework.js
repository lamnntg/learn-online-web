import React, { useState, useEffect } from "react";
import Operations from "../../components/Exam/Operations";
import ReactQuill from "react-quill";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Skeleton,
  Divider,
  Space,
  Spin,
  Modal,
  message,
  Affix,
} from "antd";

import {
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";
import {
  getHomeworkDetail,
  finishHomework,
} from "../../services/homework.service";
import { authService } from "../../services/auth.service";
import { clone } from "lodash";
const { Title } = Typography;
const listAnswers = ["A", "B", "C", "D", "E"];
const { confirm } = Modal;

export default function Homework(params, props) {
  const currentUser = authService.getCurrentUser();
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

  const finishExam = () => {
    // var canSubmit = true;
    // answers.forEach(ans => {
    //   if (!ans.completed) {
    //     canSubmit = false;
    //   }
    // });

    showPromiseConfirm();
  };

  function showPromiseConfirm() {
    confirm({
      title: "Bạn có chắc chắn muốn nộp bài thi ?",
      icon: <ExclamationCircleOutlined />,
      content: "Kiểm tra lại đáp án trước khi nộp bài",
      onOk() {
        const data = {
          answers: answers,
          homework: homeworkInfo,
        };
        return new Promise((resolve, reject) => {
          finishHomework(homeworkId, data).then((result) => {
            setIsStart(false);
            resolve(result);
          });
        })
          .then((result) => {
            history.push(`/classroom/${classroom._id}`);
            message.success("Nộp bài thành công");
          })
          .catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  }

  const handleInputTypeAnswer = (i, value) => {
    const newAnswers = clone(answers);
    newAnswers[i].text_answer = value;
    if (newAnswers[i].text_answer !== "") {
      newAnswers[i].completed = true;
    }

    setAnswers(newAnswers);
  };

  const chooseAnswer = (ques, ans) => {
    const newAnswers = clone(answers);

    newAnswers[ques].answers[ans].selected =
      !newAnswers[ques].answers[ans].selected;

    var countChooseAnswersCount = 0;
    const countAnswers = newAnswers[ques].answers.length;
    newAnswers[ques].answers.forEach(function (answer) {
      if (answer.selected) {
        countChooseAnswersCount = countChooseAnswersCount + 1;
      }
    });

    if (countChooseAnswersCount > 0) {
      newAnswers[ques].completed = true;
    } else {
      newAnswers[ques].completed = false;
    }

    if (countChooseAnswersCount >= countAnswers) {
      message.warning("Bạn đã chọn quá nhiều đáp án đúng");
    } else {
      setAnswers(newAnswers);
    }
    return;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStart === true) {
        let minute = countDown.minutes;
        let second = countDown.seconds;
        if (minute === 0 && second === 1) {
          clearInterval(interval);
          finishExam();
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
      history.push(`/classroom/${classroom._id}/homework`);
    }
  }, [startModalVisiable, isStart, history, classroom._id]);

  //redirect to another page
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (isStart === true) {
          return window.confirm("Bạn chắc chắn muốn nộp bài làm?");
        }
        return true;
    });

    // window.onpopstate = function () {
    //   if (isBlocking === true && isStart === true) {
    //     var continute = window.confirm("Bạn chắc chắn muốn nộp bài làm?");

    //     if (continute) {
    //       return true;
    //     } else {
    //     }
    //   }
    // };

    // window.onpopstate = function() {
    //   if (isBlocking === true && isStart === true) {
    //     return window.confirm("Bạn chắc chắn muốn nộp bài làm?");
    //   }
    // };

    return () => {
      unblock();
    };
  }, [history, isStart]);

  useEffect(() => {
    getHomeworkDetail(homeworkId)
      .then((res) => {
        const homeworkInfor = {
          ...res,
        };
        delete homeworkInfor.questions;

        setQuestions(res.questions);

        var newAnswers = [];
        var totalPoint = 0;
        res.questions.forEach((ques, i) => {
          totalPoint = totalPoint + ques.point;
          var text_answer = null;
          if (ques.type === "answer") {
            text_answer = "";
          }
          newAnswers.push({
            question_id: ques._id,
            answers: Array.from(ques.answers, (element) => {
              return {
                ...element,
                selected: false,
              };
            }),
            text_answer: text_answer,
            completed: false,
            point: ques.point,
            type: ques.type,
          });
        });
        setAnswers(newAnswers);
        setCountDown({ minutes: homeworkInfor.time, seconds: 0 });
        setHomeworkInfo({
          ...homeworkInfor,
          totalPoint: totalPoint,
          user: currentUser.id,
        });

        setIsLoading(false);
        setIsBlocking(false);

      })
      .catch((err) => console.log(err));

    return () => {
      setIsBlocking(false);
    };
  }, [currentUser.id, homeworkId]);

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
          <div style={{ marginBottom: "10px" }}>
            <div style={{ width: "100%" }}>
              <Row span={24}>
                <Col span={24}>
                  <Card
                    className=" full-width"
                    style={{
                      backgroundColor: "rgb(250, 250, 250)",
                      borderRadius: "10px",
                    }}
                  >
                    <Row className="ph-24">
                      <Col xs={24}>
                        <h6 className="font-semibold font-16">
                          Câu hỏi số {i + 1} : {ques.question} --
                          <span className="blue">{ques.point} Điểm</span>
                        </h6>
                      </Col>
                      {ques.url !== "" ? (
                        <div className="img-center">
                          <img
                            className="center"
                            src={ques.url}
                            width="350px"
                            height="auto"
                            alt=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </Row>
                    <Row span={24}>
                      <Col span={24}>
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
                          {ques.type === "choose" ? (
                            <>
                              <b style={{ paddingRight: "30px" }}>
                                Chọn câu trả lời:
                              </b>
                              {answers[i].answers.map((ans, j) => (
                                <Col span={3}>
                                  <Button
                                    className="btn-choose-answer"
                                    style={
                                      ans.selected
                                        ? {
                                            backgroundColor: "#1890ff",
                                            color: "white",
                                            borderRadius: "50%",
                                          }
                                        : {
                                            borderRadius: "50%",
                                          }
                                    }
                                    onClick={() => {
                                      chooseAnswer(i, j);
                                    }}
                                  >
                                    {listAnswers[j]}
                                  </Button>
                                </Col>
                              ))}
                            </>
                          ) : (
                            <>
                              <ReactQuill
                                className="editor"
                                value={answers[i].text_answer}
                                onChange={(value) => {
                                  handleInputTypeAnswer(i, value);
                                }}
                                placeholder="Nhập câu trả lời..."
                              />
                            </>
                          )}
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
                      <Title level={5}>Nội dung bài kiểm tra:</Title>
                      <Paragraph className="lastweek">
                        Kiểm tra lại đáp án trước khi nộp bài
                        {/* <span className="blue">40%</span> */}
                      </Paragraph>

                      <div>{questionsUI()}</div>
                    </div>
                  </div>
                  <div className="ant-list-box table-responsive"></div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Affix
                  offsetTop={0}
                  onChange={(affixed) => console.log(affixed)}
                >
                  <Card bordered={false} className="criclebox">
                    <div className="timeline-box">
                      <Title level={5}>{homeworkInfo.title}</Title>
                      <Paragraph
                        className="lastweek"
                        style={{ marginBottom: 24 }}
                      >
                        {homeworkInfo.description}
                      </Paragraph>
                      <div>
                        <b>Tổng số điểm :</b> {homeworkInfo.totalPoint} điểm
                      </div>
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
                          {/* <img
                          alt="User Icon"
                          src="#"
                          className="loggedin-trainee-logo"
                        /> */}
                          <div className="loggedin-trainee-details-container">
                            <p style={{ color: "black" }}>
                              Danh sách câu hỏi :
                            </p>
                          </div>
                        </div>
                      </div>
                      <Operations
                        questions={questions}
                        setAnswers={setAnswers}
                        answers={answers}
                      />
                      <Space direction="vertical" size={12}></Space>
                      <Button
                        type="primary"
                        className="width-100"
                        onClick={() => {
                          finishExam();
                        }}
                      >
                        {<MenuUnfoldOutlined />} Nộp bài
                      </Button>
                    </div>
                  </Card>
                </Affix>
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
