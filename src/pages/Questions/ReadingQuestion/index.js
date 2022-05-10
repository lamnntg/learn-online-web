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
} from "antd";
import {
  QuestionCircleOutlined,
  CommentOutlined,
  HeartOutlined,
  UserOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { getQuestionByID } from "../../../services/questions.service";
import { userService } from "../../../services/user.service";
import moment from "moment";
import BgProfile from "../../../assets/images/classroom.jpg";
import "./read.question.scss";

const ReadQuestion = () => {
  const location = useLocation();
  const { Title, Paragraph } = Typography;
  const [questionInfo, setQuestionInfo] = useState(null);
  const [author, setAuthor] = useState(null);
  const [visible, setVisible] = useState(false);
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

  const convertTime = (time) => {
    return moment(time).format("LL");
  };
  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const showComment = () => {
    // call api
    showDrawer();
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
                            21
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
                            21
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
                  </Title>
                </div>

                <Col className="sidebar-color">
                  <Row align="bottom" style={{ marginBottom: "10px" }}>
                    <Col span={2}>
                      <Avatar
                        size={32}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </Col>
                    <Col span={22}>
                      <input
                        style={{
                          outline: "0",
                          border: 0,
                          borderBottom: "1px solid #333",
                          width: "100%",
                        }}
                        placeholder="Viết bình luận"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row justify="end" style={{ marginBottom: "30px" }}>
                    <Button type="danger" style={{ marginRight: "15px" }}>
                      Hủy bỏ
                    </Button>
                    <Button type="primary">Bình luận</Button>
                  </Row>
                  {dummy.map((el) => (
                    <Comment
                      author={<a>Han Solo</a>}
                      avatar={
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <p>
                          We supply a series of design principles, practical
                          patterns and high quality design resources (Sketch and
                          Axure), to help people create their product prototypes
                          beautifully and efficiently.
                        </p>
                      }
                      datetime={
                        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                          <span>{moment().fromNow()}</span>
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
              </div>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadQuestion;
