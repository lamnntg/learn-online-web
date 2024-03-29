import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, {
  formats,
  modules,
} from "../../../utils/ReactQuill.config";
import {
  getAllQAByUserId,
  createQA,
} from "../../../services/questions.service";
import { authService } from "../../../services/auth.service";
import "react-quill/dist/quill.snow.css";
import "./question.style.scss";

import { Row, Button, Col, Upload, Input, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import CardQuestion from "../../../components/card/CardQuestion";

function CreateQuestion() {
  const history = useHistory();
  const user = authService.getCurrentUser();
  const [listQuestions, setListQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [questionValue, setQuestionValue] = useState({
    title: "",
    desc: "",
    content: "",
  });
  const [images, setImages] = useState([]);

  const handleChangeQuestionTitle = (title) => {
    const val = title.target.value;
    setQuestionValue({ ...questionValue, title: val });
  };

  const handleChangeQuestionDesc = (desc) => {
    const val = desc.target.value;
    setQuestionValue({ ...questionValue, desc: val });
  };

  const handleChangeQuestionImg = ({ fileList }) => {
    setImages([...fileList]);
  };

  const handleChangeQuestionContent = (content) => {
    setQuestionValue({ ...questionValue, content });
  };

  useEffect(async () => {
    await getAllQAByUserId(user.id).then((res) => {
      setListQuestions(res.result);
    });
  }, []);

  const handleCreateQA = async () => {
    setLoading(true);
    const { title, desc, content } = questionValue;
    const formData = new FormData();
    formData.append("image", images[0]?.thumbUrl || null);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("author", user.id);
    formData.append("content", content);

    await createQA(formData).then((res) => {
      if (res.status === 200) {
        message.success("Tạo câu hỏi thành công");
        setLoading(false);
        const idSetTimeout = setTimeout(() => {
          clearTimeout(idSetTimeout);
          history.push("/questions");
        }, 1000);
      } else {
        setLoading(false);
        message.error("Tạo câu hỏi thất bại");
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
                  value={questionValue.title.value}
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
                  value={questionValue.desc.value}
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
                value={questionValue.content}
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
              <Button onClick={handleCreateQA} type="primary">
                Tạo câu hỏi
              </Button>
            </Row>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Spin>
    </>
  );
}

export default CreateQuestion;
