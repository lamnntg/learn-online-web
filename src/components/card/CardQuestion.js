import React from 'react';
import { Card, Avatar, Row } from 'antd';

import './styles.scss';

function CardQuestion(props) {
  const { listData } = props;
  const { Meta } = Card;
  return (
    <>
      {listData.map((el, index) => (
        <Row key={`${el._id}-${index}`} style={{ marginBottom: '20px' }}>
          <Card className="card">
            <Meta
              className="card-text"
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={el.title}
              description={el.description}
              style={{ fontWeight: 'bold' }}
            />
          </Card>
        </Row>
      ))}
    </>
  );
}

export default CardQuestion;

