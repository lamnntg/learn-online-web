import React, { useEffect, useState } from "react";
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Modal,
} from "antd";
// Images
import useClassroom from "../../hooks/useClassroom";
import { isEmpty } from "lodash";

const { Title } = Typography;
// table code start
const columns = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Chức vụ",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];

const makeDataUsers = (users) => {
  return users.map((user, key) => {
    return {
      key: key,
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={user.avatar_url || null}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{user.name}</Title>
              <p>{user.email}</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button type="primary" className="tag-primary">
            ONLINE
          </Button>
        </>
      ),

      employed: (
        <>
          <div className="ant-employed">
            <span>23/04/18</span>
            <a href="#pablo">Edit</a>
          </div>
        </>
      ),
    };
  });
};

const makeDataImport = (users) => {

}

function People(params) {
  let { id } = useParams();
  const [columnsTable, setColumnsTable] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumnsTable(columns);
  };

  // handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };
  const classroom = useClassroom(params.match.params.id);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <div>
      <NavBar id={id} tab="people" />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Thành viên trong lớp"
              extra={[
                <Button type="primary" onClick={showModal}>
                  <span>Import thành viên</span>
                </Button>,
              ]}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={isEmpty(classroom) ? [] : makeDataUsers(data)}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Nhập thành viên lớp học"
        style={{ top: 20, bottom: 20 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        <div className="table-responsive">
          <Table
            columns={columns}
            pagination={{ defaultPageSize: 7, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
            dataSource={isEmpty(classroom) ? [] : makeDataUsers(data)}
            className="ant-border-space"
          />
        </div>
      </Modal>
    </div>
  );
}

export default People;
