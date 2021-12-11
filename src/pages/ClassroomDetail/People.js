import React, { useEffect, useState } from 'react';
import NavBar from "../../components/Classroom/Navbar";
import { useParams } from "react-router-dom";

export default function People() {
  let { id } = useParams();

  return (
    <div>
      <NavBar id={id} tab='people'/>
      
    </div>
  )
}
