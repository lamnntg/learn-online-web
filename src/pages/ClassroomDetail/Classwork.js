import React, { useEffect, useState } from 'react';
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";

export default function Classwork() {
  let { id } = useParams();

  return (
    <div>
      <NavBar id={id} tab='homeworks'/>
    </div>
  )
}
