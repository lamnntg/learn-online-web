import React from "react";
import { Button, Row, Col } from "antd";
import "./portal.css";

export default function CreateExam(props) {
  const { answers, questions, setAnswers } = props;

  return (
    <Row>
      {answers.map((ans, i) => {
        return (
          <Col key={i} span={4} style={{ paddingBottom: "12px" }}>
            {mark(ans, i)}
          </Col>
        );
      })}
    </Row>
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
        style={{ background: "#FFFFFF", color: "black", borderRadius: "50%" }}
      >
        {i + 1}
      </Button>
    );
  }
}
