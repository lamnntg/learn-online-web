import React, { useEffect, useState } from "react";
import "./classroom.scss";
import NavBar from "../../components/Classroom/Navbar";
import { useParams, useHistory } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";
import Detail from "../../components/homework/Detail";
import {
  Menu,
  Dropdown,
  Button,
  message,
  Card,
  Avatar,
  Col,
  Row,
  List,
  Progress,
  Modal,
  Upload,
} from "antd";
import {
  PlusOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CarryOutOutlined,
  MoreOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileProtectOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getClassroomDocuments,
  createClassroomDocument,
  deleteClassroomDocument,
  createClassroomNotifications,
} from "../../services/classroom.service";
import {
  getHomework,
  createExamPDF,
  uploadPDF,
  deleteHomework
} from "../../services/homework.service";
import { authService } from "../../services/auth.service";
import Moment from "react-moment";
import { clone } from "lodash";
import { Spin, Space } from "antd";

const { Meta } = Card;
const { confirm } = Modal;

export default function Classwork(params) {
  let { id } = useParams();
  const currentUser = authService.getCurrentUser();
  const isMorderator = authService.checkModerator();

  const classroom = useClassroom(params.match.params.id);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isVisbleUploadPdf, setIsVisbleUploadPdf] = useState(false);
  const [chooseHomework, setChooseHomework] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [homeworks, setHomeworks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [fileName, setFileName] = useState("");
  const history = useHistory();

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="exam" icon={<CarryOutOutlined />}>
        Bài kiểm tra
      </Menu.Item>
      <Menu.Item key="exam-pdf" icon={<FileProtectOutlined />}>
        Bài kiểm tra (PDF)
      </Menu.Item>
      <Menu.Item key="question" icon={<BulbOutlined />}>
        Câu hỏi
      </Menu.Item>
    </Menu>
  );

  const menuHomework = (homework) => (
    <Menu
      onClick={(e) => {
        handleMenuHomeworkClick(e, homework);
      }}
    >
      <Menu.Item key="information" icon={<InfoCircleOutlined />}>
        Thông tin
      </Menu.Item>
      {isMorderator && isMorderator === true ? (
        <>
          <Menu.Item key="mark" icon={<FileProtectOutlined />} disabled>
            Chấm điểm tự luân
          </Menu.Item>
          <Menu.Item key="edit" icon={<EditOutlined />}>
            Chỉnh sửa
          </Menu.Item>
          <Menu.Item key="delete" icon={<DeleteOutlined />}>
            Xóa
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="edit" icon={<EditOutlined />} disabled>
            Chỉnh sửa
          </Menu.Item>
          <Menu.Item key="mark" icon={<FileProtectOutlined />} disabled>
            Chấm điểm tự luân
          </Menu.Item>
          <Menu.Item key="delete" icon={<DeleteOutlined />} disabled>
            Xóa
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  function handleMenuClick(e) {
    if (e.key === "exam") {
      history.push(`/classroom/${id}/${e.key}/create`);
    }
    if (e.key === "exam-pdf") {
      setIsVisbleUploadPdf(true);
    }
  }

  async function handleMenuHomeworkClick(e, homework) {
    if (e.key === "information") {
      setDetailModalVisible(true);
      setChooseHomework(homework);
    }

    if (e.key === "delete") {
      await deleteHomework(homework._id).then((res) => {
          let newHomeworks = homeworks.filter((item) => item._id != homework._id);
          console.log(homeworks)
          setHomeworks(newHomeworks);
          message.success("Xóa thành công");
      }).catch((err) => {
        message.error("Xóa thất bại");
      })
    }

    if (e.key === "edit") {
      history.push(`/classroom/${id}/exam/${homework._id}/edit`);
    }
  }

  useEffect(async () => {
    await getClassroomDocuments(params.match.params.id)
      .then((res) => {
        setDocuments(res.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    await getHomework(params.match.params.id)
      .then((res) => {
        console.log(res);
        setHomeworks(res.result.reverse());
        setIsLoading(false);
        console.log(homeworks);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, [params.match.params.id]);

  const formUploadHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const file = data.get("file");
    setProgress(0);
    if (file) {
      uploadHandle(file);
      e.target.files = null;
      setFileName("");
      //notification
      const notification = {
        author_id: currentUser.id,
        content: `${currentUser.name} đã tải lên tài liệu: <b>${file.name}</b>`,
        author_name: currentUser.name,
        avatar_url: currentUser.avatar_url,
      };

      createClassroomNotifications(id, notification)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      message.success(`Upload thành công ${file.name}`);
    } else {
      message.error("Chưa chọn file");
    }
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName("");
    }
  };

  const uploadHandle = (file) => {
    const path = `/classrooms/${classroom._id}/${Date.now()}_${file.name}`;
    if (file) {
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(task.snapshot.ref).then((url) => {
            console.log(url);
            createDocumnentDB(file.name, file.type, url);
          });
        }
      );
    }
  };

  const createDocumnentDB = (name, type, url) => {
    let document = {
      title: name,
      type: type,
      url: url,
      author_id: currentUser._id,
    };
    createClassroomDocument(classroom._id, document)
      .then((res) => {
        var newDocuments = clone(documents);
        newDocuments.unshift(res);
        setDocuments(newDocuments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function showDeleteConfirm(item) {
    confirm({
      title: "Bạn chắc chắn muốn xóa tài liệu này ?",
      icon: <ExclamationCircleOutlined />,
      content: `${item.title}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        var deleteId = item._id;
        deleteClassroomDocument(item._id)
          .then((res) => {
            var newDocuments = documents.filter(function (obj) {
              return obj._id !== deleteId;
            });
            setDocuments(newDocuments);

            message.success("Xóa tài liệu thành công");
          })
          .catch((err) => {
            console.log(err);
            message.error("Xóa tài liệu thất bại");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const redirectToHomwork = (homework) => {
    if (Date.parse(homework.startTime) <= Date.parse(new Date())) {
      history.push(`/classroom/${classroom._id}/homework/${homework._id}`);
      return;
    }

    return message.warn("Chưa đến thời gian làm bài");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("File", pdfFile);
    setUploading(true);

    // You can use any AJAX library you like
    await uploadPDF(formData)
      .then((res) => {
        return createExamPDF({
          url_images: res.Files,
          user_id: currentUser.id,
          classroom_id: id,
        });
      })
      .then((res) => {
        setPdfFile(null);
        message.success("Tạo bài kiểm tra thành công");
        history.push(`/classroom/${id}/exam/${res.exam_id}/edit`);
        setUploading(false);
      })
      .catch(() => {
        message.error("Tạo bài kiểm tra thất bại");
        setUploading(false);
      });
  };

  const uploadPdf = {
    onRemove: (file) => {
      setPdfFile(null);
    },
    onChange(file) {
      console.log(file);
    },
    beforeUpload: (file) => {
      setPdfFile(file);
      return false;
    },
    pdfFile,
  };

  return (
    <div>
      {!isLoading ? (
        <>
          <NavBar id={id} tab="homeworks" />
          <div className="">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={16}>
                <Row gutter={[24, 0]}>
                  <Col xs={24} className="mb-24">
                    <Card
                      className="header-solid h-full ant-card-p-0"
                      title={
                        <>
                          <Row
                            gutter={[24, 0]}
                            className="ant-row-flex ant-row-flex-middle"
                          >
                            <Col xs={24} md={12}>
                              <h6 className="font-semibold m-0">
                                Bài tập lớp học
                              </h6>
                              <i style={{ fontSize: "12px" }}>
                                Chú ý: Học sinh vào muộn quá 10 phút sẽ không
                                được tham gia vào làm bài.
                              </i>
                            </Col>
                            <Col xs={24} md={12} className="d-flex">
                              <Dropdown overlay={menu}>
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  size="large"
                                >
                                  Tạo mới
                                </Button>
                              </Dropdown>
                            </Col>
                          </Row>
                        </>
                      }
                    >
                      <Row>
                        <Col span={24} md={24}>
                          {homeworks.map((homework, key) => (
                            <Card
                              key={key}
                              className="classwork-card"
                              style={{ marginBottom: "10px" }}
                            >
                              <Row>
                                <Col
                                  span={18}
                                  onClick={() => {
                                    redirectToHomwork(homework);
                                  }}
                                >
                                  <Meta
                                    // avatar={
                                    //   <Avatar src="https://joeschmoe.io/api/v1/random" />
                                    // }
                                    title={
                                      <div>
                                        <p>
                                          {/* {homework.author.name} đăng bài tập :{" "} */}
                                          <b>{homework.title}</b> (
                                          <i>{homework.description}</i>)
                                        </p>
                                        <p></p>
                                        <p>
                                          Thời gian bắt đầu:{" "}
                                          <b>
                                            {" "}
                                            <Moment format="YYYY-MM-DD HH:mm">
                                              {homework.startTime}
                                            </Moment>
                                          </b>
                                        </p>
                                        <p>
                                          Thời gian làm bài:{" "}
                                          <b> {homework.time} phút</b>
                                        </p>
                                      </div>
                                    }
                                    // description={
                                    //   <i>
                                    //     Chú ý: Học sinh vào muộn quá 10 phút sẽ
                                    //     không được tham gia vào làm bài.
                                    //   </i>
                                    // }
                                  />
                                </Col>
                                <Col span={4} offset={2}>
                                  <div>
                                    <Dropdown overlay={menuHomework(homework)}>
                                      <Button
                                        type="link"
                                        icon={<InfoCircleOutlined />}
                                        size="large"
                                      >
                                        Thao tác
                                      </Button>
                                    </Dropdown>
                                    {/* <Button
                                      type="link"
                                      size="large"
                                      onClick={() => {
                                        setDetailModalVisible(true);
                                        setChooseHomework(homework);
                                      }}
                                    >
                                      {<InfoCircleOutlined />}
                                    </Button> */}
                                    {/* <Button type="link">
                                      {<EditOutlined />}
                                    </Button>
                                    <Button type="link">
                                      {<DeleteOutlined />}
                                    </Button> */}
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          ))}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col span={24} md={8} className="mb-24">
                <Card
                  bordered={false}
                  className="header-solid h-full ant-invoice-card"
                  title={[
                    <h6 className="font-semibold m-0">Tài liệu lớp học</h6>,
                  ]}
                >
                  <List
                    itemLayout="horizontal"
                    className="invoice-list"
                    dataSource={documents}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="link"
                            onClick={(e) => {
                              showDeleteConfirm(item);
                            }}
                          >
                            {<DeleteOutlined />}
                          </Button>,
                          <Button
                            type="link"
                            onClick={() => {
                              window.open(item.url, "_blank");
                            }}
                          >
                            {<DownloadOutlined />}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={
                            <Moment format="YYYY-MM-DD HH:mm">
                              {item.createdAt}
                            </Moment>
                          }
                        />
                        <div className="amount" style={{ fontSize: "10px" }}>
                          {" "}
                          {item.type}
                        </div>
                      </List.Item>
                    )}
                  />
                  <div className="uploadfile pb-15 shadow-none">
                    <form onSubmit={formUploadHandler} className="ant-full-box">
                      <input
                        id="upload-input"
                        type="file"
                        onChange={handleFileSelected}
                        className="input"
                        name="file"
                        style={{ display: "none" }}
                      />
                      <div
                        onClick={() => {
                          document.getElementById("upload-input").click();
                        }}
                      >
                        <i>{fileName}</i>
                        <Progress percent={progress} showInfo={false} />
                      </div>

                      <button
                        type="submit"
                        className="btn-upload-file"
                        disabled={!fileName}
                        // icon={<ToTopOutlined />}
                      >
                        Upload tài liệu
                      </button>
                    </form>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <Modal
            visible={detailModalVisible}
            title="Chi tiết bài kiểm tra"
            onOk={() => {
              setDetailModalVisible(false);
            }}
            onCancel={() => {
              setDetailModalVisible(false);
              setChooseHomework({});
            }}
            afterClose={() => {
              setDetailModalVisible(false);
              setChooseHomework({});
            }}
            style={{
              top: "20px",
              padding: "0px",
              backgroundColor: "rgb(155,175,190)",
            }}
            width="90%"
            destroyOnClose={true}
            footer={[]}
          >
            <Detail homework={chooseHomework} />
          </Modal>
          <Modal
            title="Tạo bài kiểm tra (PDF)"
            visible={isVisbleUploadPdf}
            onOk={handleUpload}
            onCancel={() => setIsVisbleUploadPdf(false)}
            okText={uploading ? "Đang tải..." : "Bắt đầu tạo"}
            footer={[
              <Button key="back" onClick={() => setIsVisbleUploadPdf(false)}>
                Hủy
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={uploading}
                onClick={handleUpload}
              >
                Tạo bài kiểm tra
              </Button>,
            ]}
          >
            <Upload {...uploadPdf}>
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          </Modal>
        </>
      ) : (
        <Space size="middle" className="loading">
          <Spin size="large" />
        </Space>
      )}
    </div>
  );
}
