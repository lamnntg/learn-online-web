import { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { Row, Col, Card, Button, Avatar, Upload, message } from "antd";
import { getAllQA } from "../../services/questions.service";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { getAllQAByUserId } from "../../services/questions.service";
import { getQuestion } from "../../redux/question/question.actions";
import { useDispatch } from "react-redux";
import store from "../../redux/store";
import imageDefault from "../../assets/images/classroom.jpg";

import "./style.scss";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const user = authService.getCurrentUser();
  const [imageURL, setImageURL] = useState(false);
  const [listQuestions, setListQuestions] = useState([]);
  const [, setLoading] = useState(false);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const createQuestionPath = `${location.pathname}/create`;

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
    getAllQAByUserId(user.id).then((res) => {
      setListQuestions(res.result);
    });
  }, []);

  const onReading = (id) => {
    history.push(`${location.pathname}/read/${id}`);
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
              <NavLink to={createQuestionPath}>
                <Button type="primary">Tạo câu hỏi</Button>
              </NavLink>
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
              {/* <NavLink to={readQuestionPath}> */}
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
                <h5 className="card-tag">{p.title}</h5>
                <p>{p.description}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  {/* <Col span={12}>
										<Button type='button'>VIEW PROJECT</Button>
									</Col> */}
                </Row>
              </Card>
              {/* </NavLink> */}
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default Questions;
