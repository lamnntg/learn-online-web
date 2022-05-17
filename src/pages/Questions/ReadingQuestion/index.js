import { useEffect, useState } from "react";
import {
  Col,
  Drawer,
  Row,
  Typography,
  Comment,
  Tooltip,
  Avatar,
  Button,
  Spin,
  Space,
} from "antd";
import {
  QuestionCircleOutlined,
  CommentOutlined,
  HeartOutlined,
  UserOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import {
  getQuestionByID,
  getCommentByQaId,
  postCommentByQaId,
} from "../../../services/questions.service";
import { userService } from "../../../services/user.service";
import moment from "moment";
import BgProfile from "../../../assets/images/classroom.jpg";
import "./read.question.scss";
import { authService } from "../../../services/auth.service";

const ReadQuestion = () => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const { Title, Paragraph } = Typography;
  const [questionInfo, setQuestionInfo] = useState(null);
  const [author, setAuthor] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loadingComment, setLoadingComment] = useState(true);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");

  const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const questionId = location.pathname.split("/").pop();
  useEffect(async () => {
    await getQuestionByID(questionId).then((res) => {
      setQuestionInfo({ ...res.result.shift() });
    });
  }, []);

  useEffect(async () => {
    if (questionInfo) {
      await userService.getUserById(questionInfo.author).then((res) => {
        setAuthor(res.data.result);
      });
    }
  }, [questionInfo]);

  const getAllComments = async () => {
    await getCommentByQaId(questionId).then((res) => {
      setComments(res.result.reverse());
      setLoadingComment(false);
    });
  };

  const convertTime = (time) => {
    return moment(time).format("LL");
  };
  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const showComment = async () => {
    // call api
    if (comments === null) {
      await getAllComments();
    }
    showDrawer();
  };

  const addComment = (data) => {
    const newData = { ...data, user: currentUser };
    setComments([newData, ...comments]);
  };

  const submitComment = async () => {
    const data = {
      userQuestion: questionId,
      userId: currentUser.id,
      content: comment,
    };
    await postCommentByQaId(data).then((res) => {
      setComment("");
      addComment(res.result);
    });
  };

  const setValueInput = async (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="read">
      <div className="container">
        {questionInfo && (
          <>
            <div className="m-0 image-bg">
              <img
                alt="Thumnail"
                src={questionInfo.url || BgProfile}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="read-title">
              <Title level={3}>
                <Row span={24} justify="space-between">
                  <Col span={12}>
                    <QuestionCircleOutlined /> {questionInfo.title}
                  </Col>
                  <Col span={3} justify="end" style={{ cursor: "pointer" }}>
                    <Row justify="space-between">
                      <Col span={12}>
                        <Row align="middle" onClick={() => showComment()}>
                          <CommentOutlined />
                          <Paragraph
                            style={{
                              fontSize: "15px",
                              margin: 0,
                              paddingLeft: "10px",
                            }}
                          >
                            {" "}
                            {comments && comments.length}
                          </Paragraph>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row align="middle">
                          <HeartOutlined />
                          <Paragraph
                            style={{
                              fontSize: "15px",
                              margin: 0,
                              paddingLeft: "10px",
                            }}
                          >
                            {" "}
                          </Paragraph>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Title>
              <Paragraph level={5} className="read-time">
                {author && author.name} - {convertTime(questionInfo.createdAt)}
              </Paragraph>
            </div>
            <div className="read-content">
              <div
                dangerouslySetInnerHTML={{ __html: questionInfo.content }}
              ></div>
            </div>
            <Drawer
              className="settings-drawer"
              mask={true}
              width={680}
              onClose={hideDrawer}
              visible={visible}
            >
              <div layout="vertical">
                <div className="header-top">
                  <Title level={4} id="comment-custom">
                    Bình luận
                    {loadingComment && <Spin />}
                  </Title>
                </div>

                {!loadingComment && (
                  <>
                    <Col className="sidebar-color">
                      <Row align="bottom" style={{ marginBottom: "10px" }}>
                        <Col span={2}>
                          <Avatar size={32} src={currentUser.avatar_url} />
                        </Col>
                        <Col span={22}>
                          <input
                            style={{
                              outline: "0",
                              border: 0,
                              borderBottom: "1px solid #333",
                              width: "100%",
                            }}
                            value={comment}
                            onChange={(e) => setValueInput(e)}
                            placeholder="Viết bình luận"
                            type="text"
                          />
                        </Col>
                      </Row>
                      <Row justify="end" style={{ marginBottom: "30px" }}>
                        <Button
                          type="danger"
                          style={{ marginRight: "15px" }}
                          onClick={() => setComment("")}
                        >
                          Hủy bỏ
                        </Button>
                        <Button type="primary" onClick={() => submitComment()}>
                          Bình luận
                        </Button>
                      </Row>
                      {comments &&
                        comments.map((el) => (
                          <Comment
                            author={<a>{el.user.name}</a>}
                            avatar={
                              <Avatar
                                src={el.user.avatar_url}
                                alt={el.user.name}
                              />
                            }
                            content={<p>{el.content}</p>}
                            datetime={
                              <Tooltip
                                title={moment(el.createdAt).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              >
                                <span>{moment(el.createdAt).fromNow()}</span>
                              </Tooltip>
                            }
                          />
                        ))}
                    </Col>
                    <a href="#comment-custom">
                      <UpCircleOutlined
                        style={{
                          fontSize: "40px",
                          color: "#ff970b",
                          position: "fixed",
                          bottom: "20px",
                          right: "30px",
                          cursor: "pointer",
                        }}
                      ></UpCircleOutlined>
                    </a>
                  </>
                )}
              </div>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadQuestion;
