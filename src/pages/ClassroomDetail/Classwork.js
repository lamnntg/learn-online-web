import React, { useEffect, useState } from "react";
import NavBar from "../../components/Classroom/Navbar";
import { useParams, useHistory } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";
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
} from "antd";
import {
  PlusOutlined,
  BulbOutlined,
  BookOutlined,
  CarryOutOutlined,
  MoreOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getClassroomDocuments,
  createClassroomDocument,
  deleteClassroomDocument,
  createClassroomNotifications,
} from "../../services/classroom.service";
import { authService } from "../../services/auth.service";
import Moment from "react-moment";
import { clone } from "lodash";

const { Meta } = Card;
const { confirm } = Modal;

export default function Classwork(params) {
  let { id } = useParams();
  const currentUser = authService.getCurrentUser();

  const classroom = useClassroom(params.match.params.id);
  const [progress, setProgress] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [fileName, setFileName] = useState("");
  const history = useHistory();

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="exam" icon={<CarryOutOutlined />}>
        Bài kiểm tra
      </Menu.Item>
      <Menu.Item key="question" icon={<BulbOutlined />}>
        Câu hỏi
      </Menu.Item>
    </Menu>
  );

  const menuCard = (
    <Dropdown overlay={menu}>
      <Button type="link" icon={<MoreOutlined />} size="large"></Button>
    </Dropdown>
  );

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
    history.push(`/classroom/${id}/${e.key}/create`);
  }

  useEffect(() => {
    getClassroomDocuments(params.match.params.id)
      .then((res) => {
        setDocuments(res.reverse());
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
  return (
    <div>
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
                          <h6 className="font-semibold m-0">Bài tập lớp học</h6>
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
                      <Card
                        onClick={() => {
                          console.log("click");
                        }}
                        className="classwork-card"
                      >
                        <Row>
                          <Col span={18}>
                            <Meta
                              avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                              }
                              title="Lam Nguyen vừa đăng bài tập mới"
                              description={<i>This is the description</i>}
                            />
                          </Col>
                          <Col span={4} offset={2}>
                            <div>
                              <Button type="link">{<EditOutlined />}</Button>
                              <Button type="link">{<DeleteOutlined />}</Button>
                            </div>
                          </Col>
                        </Row>
                      </Card>
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
              title={[<h6 className="font-semibold m-0">Tài liệu lớp học</h6>]}
              extra={[
                <Button type="primary">
                  <span>VIEW ALL</span>
                </Button>,
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
    </div>
  );
}
