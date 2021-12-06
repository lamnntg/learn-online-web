import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Classroom/Navbar";
export default function ClassroomDetail(props) {
  let { id } = useParams();

  return (
    <div>
      <NavBar />
      {id}
    </div>
  );
}
