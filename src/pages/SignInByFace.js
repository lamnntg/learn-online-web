import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { login } from "../redux/auth/auth.actions";
import { Link, Redirect, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Spin, Space } from "antd";

export default function SignInByFace(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    try {
      var loginValues = jwt.verify(token, "secret-learn-online-key");
    } catch (err) {
      console.log(err);
    }

    const username = loginValues.username;
    const password = loginValues.password;
    console.log(loginValues);
    handleLogin(username, password);
  }, [window.location.search]);

  const handleLogin = async (username, password) => {
    dispatch(login(username, password))
      .then(() => {
        history.push("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Space size="middle" className="loading">
        <Spin size="large" />
      </Space>
    </div>
  );
}
