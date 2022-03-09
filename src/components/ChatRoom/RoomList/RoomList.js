import { Button, Collapse, Typography } from "antd";
import React, { useContext, useMemo } from "react";
import "./RoomList.scss";
import { PlusSquareOutlined, CaretRightOutlined } from "@ant-design/icons";
import { AppContext } from "../../../Contexts/AppProviderContext";
const { Panel } = Collapse;

export default function RoomList() {
  const { rooms } = useContext(AppContext);
  const { setIsAddRoomVisible, setSellectedRoomId } = useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const sellectRoom = (roomId) => {
    setSellectedRoomId(roomId);
  };

  return (
    <div>
      <Collapse className="room-list" defaultActiveKey={["1"]}>
        <Panel
          className="room-list__panel"
          header="List Room"
          key="1"
          style={{ color: "white" }}
        >
          <div className="room-list__detail">
            {rooms.map((room, index) => 
              <div 
                key={ room.id }
              >
                <CaretRightOutlined />
                <Typography.Link
                  onClick={() => {
                    sellectRoom(room.id)
                  }}
                >
                  {room.name}
                </Typography.Link>
              </div>
            )}
          </div>
          <Button
            type="text"
            icon={<PlusSquareOutlined />}
            onClick={handleAddRoom}
          >
            Add Room
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
}
