import React, { useEffect, useState } from "react";
import { getClassroomById } from "../services/classroom.service";

const useClassroom = (classroomId) => {
  const [classroom, setClassroom] = useState({});

  useEffect(async () => {
    await getClassroomById(classroomId)
      .then((res) => {
        setClassroom(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [classroomId]);

  return classroom;
}

export default useClassroom;
