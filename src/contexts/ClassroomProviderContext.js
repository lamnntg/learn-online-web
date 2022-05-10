import React, { useEffect, useState } from "react";
import { getClassroomById } from "../services/classroom.service";
import { Spin } from "antd";

export const ClassroomContext = React.createContext();

export default function ClassroomProviderContext({ children }) {
  const [classroom, setClassroom] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let classroomId = localStorage.getItem('classroomId')

  useEffect(async () => {
    const unsubscibed = await getClassroomById(classroomId)
      .then((res) => {
        setClassroom(res.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    return () => {
      unsubscibed();
    };
    
  }, [classroomId]);

  return <div>
    <ClassroomContext.Provider value={{ classroom }}>
      {isLoading ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            left: "50%",
            bottom : "50%"
          }}
        />
      ) : (
        children
      )}
    </ClassroomContext.Provider>

  </div>;
}
