import React from 'react'
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";
import useClassroom from "../../hooks/useClassroom";

export default function Setting(params) {
  let { id } = useParams();
  const classroom = useClassroom(params.match.params.id);

  return (
    <div>
      <NavBar id={id} tab="setting" />
    </div>
  )
}
