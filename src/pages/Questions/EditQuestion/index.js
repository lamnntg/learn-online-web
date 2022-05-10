import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, {
  formats,
  modules,
} from "../../../utils/ReactQuill.config";
import {
  getAllQAByUserId,
  updateQuestionById,
  getQuestionByID,
} from "../../../services/questions.service";
import { authService } from "../../../services/auth.service";
import "react-quill/dist/quill.snow.css";

import { Row, Button, Col, Upload, Input, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CardQuestion from "../../../components/card/CardQuestion";

import "./question.style.scss";

function EditQuestion() {
  const location = useLocation();
  const history = useHistory();
  const user = authService.getCurrentUser();
  const [listQuestions, setListQuestions] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // const [questionValue, setQuestionValue] = useState({
  //   title: "",
  //   description: "",
  //   content: "",
  // });
  const questionId = location.pathname.split("/").pop();

  useEffect(async () => {
    setTimeout(async () => {
      await getQuestionByID(questionId).then(async (res) => {
        const { title, description, content, url } = res.result.shift();
        setTitle(title);
        setDescription(description);
        setContent(content);
        setImages([{ url }]);
      });
    }, 200);
  }, []);

  const handleChangeQuestionTitle = (title) => {
    const val = title.target.value;
    setTitle(val);
  };

  const handleChangeQuestionDesc = (description) => {
    const val = description.target.value;
    setDescription(val);
  };

  const handleChangeQuestionImg = ({ fileList }) => {
    if (fileList.length < 2) {
      setImages([...fileList]);
    } else {
      message.warning("Chỉ cho phép upload duy nhất một ảnh");
    }
  };

  const handleChangeQuestionContent = (content) => {
    setContent(content);
  };

  useEffect(async () => {
    await getAllQAByUserId(user.id).then((res) => {
      setListQuestions(res.result);
    });
  }, []);

  const handleUpdateQA = async () => {
    setLoading(true);
    const formData = new FormData();
    if (!images.length) {
      formData.append("image", false);
    } else if (images && images[0]?.thumbUrl) {
      formData.append("image", images[0]?.thumbUrl);
    }
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("author", user.id);
    formData.append("content", content);

    await updateQuestionById(questionId, formData).then((res) => {
      if (res.result) {
        setLoading(false);
        message.success("Cập nhật câu hỏi thành công");
        const idSetTimeout = setTimeout(() => {
          clearTimeout(idSetTimeout);
          history.push("/questions");
        }, 1000);
      } else {
        setLoading(false);
        message.error("Cập nhật câu hỏi thất bại");
      }
    });
  };

  const beforeUpload = () => {
    return false;
  };

  return (
    <>
      <Spin spinning={loading}>
        <Row
          className="question"
          justify="space-between"
          style={{ height: "70vh" }}
        >
          <Col span={16} value="middle">
            <Col>
              <div>
                <h3>Tiêu đề</h3>
                <Input
                  type="text"
                  placeholder="Tiêu đề câu hỏi"
                  value={title}
                  onChange={handleChangeQuestionTitle}
                />
              </div>
            </Col>
            <Col>
              <div>
                <h3>Mô tả câu hỏi</h3>
                <Input
                  type="text"
                  placeholder="Tiêu đề câu hỏi"
                  value={description}
                  onChange={handleChangeQuestionDesc}
                />
              </div>
            </Col>
            <Col>
              <h3>Hình ảnh</h3>
              <Upload
                listType="picture"
                fileList={images}
                onChange={handleChangeQuestionImg}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Col>
            <div className="question_content">
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChangeQuestionContent}
                placeholder={"Nội dung cần tạo ..."}
                modules={modules}
                formats={formats}
              />
            </div>
          </Col>
          <Col className="question_list" span={6} style={{ height: "100%" }}>
            <h3>Danh sách câu hỏi của bạn</h3>
            <div style={{ overflow: "scroll", height: "100%" }}>
              <CardQuestion listData={listQuestions} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Row justify="end" style={{ marginTop: "20px" }}>
              <Button onClick={handleUpdateQA} type="primary">
                Cập nhật câu hỏi
              </Button>
            </Row>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Spin>
    </>
  );
}

export default EditQuestion;
