import React, { useEffect, useState } from "react";
import { Table, Tag, Card } from "antd";
import { getResultHomework } from "../../services/homework.service";
import moment from "moment";

export default function Result(props) {
  const { homework } = props;
  const [results, setResults] = useState([]);
  useEffect(async () => {
    await getResultHomework(homework._id)
      .then((res) => {
        console.log(res);
        setResults(res);
      })
      .catch((err) => {});
  }, [homework]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "user",
      key: "_id",
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "_id",
      render: (user) => <span>{user.email}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "_id",
      render: (status) => (
        <Tag color={"red"}>
          Chưa chấm tự luận
        </Tag>
      ),
    },
    {
      title: "Nộp bài",
      dataIndex: "createdAt",
      key: "_id",
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
      ),
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "_id",
    },
    {
      title: "Ghi chú",
      dataIndex: "point",
      key: "_id",
      render: (tag) => (
        <span>
          {/* <Tag color={tag >= maxMarks / 2 ? "green" : "red"} key={tag}>
            {tag >= maxMarks / 2 ? "Pass" : "Fail"}
          </Tag> */}
        </span>
      ),
    },
  ];
  return (
    <div>
      <Card>
        <div className="download-section">
          <Table
            pagination={false}
            rowKey="_id"
            columns={columns}
            dataSource={results}
          />
        </div>
      </Card>
    </div>
  );
}
