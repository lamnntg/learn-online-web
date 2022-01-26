import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Slider } from "antd";

import "./MeetingRoom.scss";
import Messenger from "../../components/UI/Messenger/Messenger";
import Alert from "../../components/UI/Alert/Alert";
import MeetingInfo from "../../components/UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../../components/UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../../components/UI/CallPageHeader/CallPageHeader";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

let peer = null;

export default function MeetingRoom(props) {
  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const isAdmin = window.location.hash === "#init" ? true : false;

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.id;
  socketRef.current = io("http://localhost:8000");

  const history = useHistory();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStreamObj(stream);
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        console.log(screenStream);
        userVideo.current.srcObject = screenStream;
        // peer.replaceTrack(
        //   streamObj.getVideoTracks()[0],
        //   screenStream.getVideoTracks()[0],
        //   streamObj
        // );
        setScreenCastStream(screenStream);
        // screenStream.getTracks()[0].onended = () => {
        //   peer.replaceTrack(
        //     screenStream.getVideoTracks()[0],
        //     streamObj.getVideoTracks()[0],
        //     streamObj
        //   );
        // };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });

    // peer.replaceTrack(
    //   screenCastStream.getVideoTracks()[0],
    //   streamObj.getVideoTracks()[0],
    //   streamObj
    // );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disconnectCall = () => {
    // peer.destroy();
    history.push("/dashboard");
    window.location.reload();
  };

  // const sendMsg = (msg) => {
  //   peer.send(msg);
  //   messageListReducer({
  //     type: "addMessage",
  //     payload: {
  //       user: "you",
  //       msg: msg,
  //       time: Date.now(),
  //     },
  //   });
  // };

  return (
    <div>
      {/* <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
      </Container> */}
      <div className="callpage-container">
        <Col span={6}>
          <StyledVideo ref={userVideo} autoPlay playsInline />
        </Col>
        <Row gutter={[16, 16]}>
          {peers.map((peer, index) => {
            return (
              <Col span={6}>
                <Video key={index} peer={peer} />
              </Col>
            );
          })}
        </Row>

        <CallPageHeader
          isMessenger={isMessenger}
          setIsMessenger={setIsMessenger}
          messageAlert={messageAlert}
          setMessageAlert={setMessageAlert}
        />
        <CallPageFooter
          isPresenting={isPresenting}
          stopScreenShare={stopScreenShare}
          screenShare={screenShare}
          isAudio={isAudio}
          toggleAudio={toggleAudio}
          disconnectCall={disconnectCall}
        />
        {isMessenger ? (
          <Messenger
            setIsMessenger={setIsMessenger}
            sendMsg={null}
            messageList={null}
          />
        ) : (
          messageAlert.isPopup && <Alert messageAlert={messageAlert} />
        )}
        {/* {isAdmin && meetInfoPopup && (
          <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
        )}
        {isMessenger ? (
          <Messenger
            setIsMessenger={setIsMessenger}
            sendMsg={sendMsg}
            messageList={messageList}
          />
        ) : (
          messageAlert.isPopup && <Alert messageAlert={messageAlert} />
        )} */}
      </div>
    </div>
  );
}
