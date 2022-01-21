import React from "react";
import { Button, Row, Col } from "antd";
import "./portal.css";
// import { switchQuestion } from "../../../actions/traineeAction";

export default function CreateExam(props) {
  const { answers, questions, setAnswers } = props;

  return (
    // <div className="question-list-wrapper">
    //   <div className="question-list-inner">
    <Row>
      {answers.map((ans, i) => {
        return (
          <Col key={i} span={4} style={{ paddingBottom: "12px" }}>
            {mark(ans, i)}
          </Col>
        );
      })}
    </Row>
    //   </div>
    // </div>
  );
}

function mark(ans, i) {
  if (ans.completed) {
    return (
      <Button
        className="qb"
        style={{ background: "gray", color: "white", borderRadius: "50%" }}
      >
        {i + 1}
      </Button>
    );
  } else {
    return (
      <Button
        className="qb"
        style={{ background: "white", color: "black", borderRadius: "50%" }}
      >
        {i + 1}
      </Button>
    );
  }
}
