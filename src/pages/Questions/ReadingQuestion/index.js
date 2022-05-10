import { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import {
  QuestionCircleOutlined,
  CommentOutlined,
  HeartOutlined,
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
                  <Col span={2} justify="end" style={{ cursor: "pointer" }}>
                    <Row justify="space-between">
                      <Col span={12}>
                        <Row align="middle">
                          <CommentOutlined />
                          <Paragraph> 21</Paragraph>
                        </Row>
                      </Col>
                      <HeartOutlined />
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
          </>
        )}
      </div>
    </div>
  );
};

export default ReadQuestion;
