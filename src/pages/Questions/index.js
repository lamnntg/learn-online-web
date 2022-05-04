import { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { Row, Col, Card, Button, Typography } from "antd";
import { getAllQA } from "../../services/questions.service";
import store from "../../redux/store";
import imageDefault from "../../assets/images/classroom.jpg";
import moment from "moment";

import "./style.scss";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const user = authService.getCurrentUser();
  const [imageURL, setImageURL] = useState(false);
  const [listQuestions, setListQuestions] = useState([]);
  const [ellipsis, setEllipsis] = useState(true);
  const { Title, Paragraph } = Typography;
  const [, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const createQuestionPath = `${location.pathname}/create`;
  const myQuestionPath = `/my-questions`;

  useEffect(() => {
    getAllQA()
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllQA().then((res) => {
      setListQuestions(res);
    });
  }, []);

  const onReading = (id) => {
    history.push(`${location.pathname}/read/${id}`);
  };

  const infoAuthor = (userId) => {
    const qs = listQuestions.find((el) => el._id === userId);

    return `${qs.author && qs.author.name} - ${moment(qs.createdAt).format(
      "LL"
    )}`;
  };

  return (
    <>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <div>
              <h6 className="font-semibold">Câu hỏi</h6>
              <p>Chia sẻ & học hỏi kiến thức</p>
            </div>

            <Row justify="end">
              <div style={{ marginRight: "10px" }}>
                <NavLink to={createQuestionPath}>
                  <Button type="primary">Tạo câu hỏi</Button>
                </NavLink>
              </div>

              <div>
                <NavLink to={myQuestionPath}>
                  <Button type="light">Câu hỏi của bạn</Button>
                </NavLink>
              </div>
            </Row>
          </>
        }
      >
        <Row gutter={[24, 24]} className="question">
          {listQuestions.map((p, index) => (
            <Col
              span={24}
              md={12}
              xl={6}
              key={index}
              className="h-full question-post"
            >
              <Card
                onClick={() => onReading(p._id)}
                bordered={false}
                className="card-project"
                cover={
                  <img
                    alt="Thumnail"
                    src={p.url || imageDefault}
                    style={{ maxHeight: "180px", objectFit: "cover" }}
                  />
                }
              >
                <Title
                  type="secondary"
                  level={5}
                  style={ellipsis ? { width: "100%" } : undefined}
                  ellipsis={ellipsis ? { tooltip: p.title } : false}
                >
                  {p.title}
                </Title>
                <Paragraph type="secondary">{infoAuthor(p._id)}</Paragraph>
                <Row gutter={[6, 0]} className="card-footer">
                  {/* <Col span={12}>
										<Button type='button'>VIEW PROJECT</Button>
									</Col> */}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default Questions;
