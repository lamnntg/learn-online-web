import { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { authService } from "../../../services/auth.service";
import { Row, Col, Card, Typography, message, Popconfirm, Spin } from "antd";
import { getAllQA } from "../../../services/questions.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllQAByUserId,
  deleteQuestionById,
} from "../../../services/questions.service";
import { useDispatch } from "react-redux";
import imageDefault from "../../../assets/images/classroom.jpg";

function MyQuestions() {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const user = authService.getCurrentUser();
  const [listQuestions, setListQuestions] = useState([]);
  const [ellipsis, setEllipsis] = useState(true);
  const [loading, setLoading] = useState(false);
  const { Text } = Typography;
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const createQuestionPath = `${location.pathname}/create`;
  const editQuestionPath = `${location.pathname}/edit`;

  useEffect(async () => {
    await getAllQA()
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(async () => {
    await getAllQAByUserId(user.id).then((res) => {
      setListQuestions(res.result);
    });
  }, []);

  const onEdit = (id) => {
    history.push(`${location.pathname}/${id}`);
  };

  const onDelete = async (id) => {
    setLoading(true);
    try {
      await deleteQuestionById(id).then((res) => {
        if (res.result) {
          const dataQuestions = listQuestions.filter((el) => el._id !== id);
          setListQuestions(dataQuestions);
          message.success(`Xóa câu hỏi thành công`);
        }
        setLoading(false);
      });
    } catch (error) {
      message.warning(`Xóa câu hỏi không thành công`);
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <Card
          bordered={false}
          className="header-solid mb-24"
          title={
            <>
              <div>
                <h6 className="font-semibold">Danh sách câu hỏi của bạn</h6>
              </div>
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
                  bordered={false}
                  className="card-project"
                  cover={
                    <img
                      alt="Thumnail"
                      src={p.url || imageDefault}
                      style={{ maxHeight: "180px", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <EditOutlined key="edit" onClick={() => onEdit(p._id)} />,
                    <Popconfirm
                      title="Bạn có đồng ý xóa câu hỏi không?"
                      onConfirm={() => onDelete(p._id)}
                      onCancel={() => {}}
                      okText="Đồng ý"
                      cancelText="Hủy bỏ"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                  ]}
                >
                  <Text
                    className="card-tag"
                    style={ellipsis ? { width: "100%" } : undefined}
                    ellipsis={ellipsis ? { tooltip: p.title } : false}
                  >
                    {p.title}
                  </Text>
                  {/* <Text
                  style={ellipsis ? { width: "100%" } : undefined}
                  ellipsis={ellipsis ? { tooltip: p.description } : false}
                >
                  {p.description}
                </Text> */}
                  <Row gutter={[6, 0]} className="card-footer"></Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Spin>
    </>
  );
}

export default MyQuestions;
