import "./UserInfo.scss";
import { Avatar, Button, Typography, Col, Row, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../../../Contexts/AuthProviderContext";

export default function UserInfo() {
  const { user } = useContext(AuthContext)
  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
      //da su dung use history
      // <Redirect to="/login" />
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="wrap-user">
      <div>
      <Tooltip title={ user.email }>
        <Avatar className="avatar-user" src={ user.photoURL }>Name</Avatar>
        <Typography.Text>{ user.displayName }</Typography.Text>
      </Tooltip>
      </div>
          <Button className="btn-logout" onClick={logOut}> Logout </Button>
    </div>
  )
}
