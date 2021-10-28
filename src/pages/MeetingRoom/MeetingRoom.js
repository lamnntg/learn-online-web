import React from 'react';
import "./MeetingRoom.scss";
import Messenger from "../../components/UI/Messenger/Messenger";
import Alert from "../../components/UI/Alert/Alert";
import MeetingInfo from "../../components/UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../../components/UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../../components/UI/CallPageHeader/CallPageHeader";

export default function MeetingRoom() {
  return (
    <div>
      <div className="callpage-container">
        <video className="video-container" src="" controls></video>
        <CallPageHeader
          isMessenger={null}
          setIsMessenger={null}
          messageAlert={null}
          setMessageAlert={null}
        />
        <CallPageFooter
          isPresenting={null}
          stopScreenShare={null}
          screenShare={null}
          isAudio={null}
          toggleAudio={null}
          disconnectCall={null}
        />

        <MeetingInfo setMeetInfoPopup={null} url={null} />

        <Messenger
          setIsMessenger={null}
          sendMsg={null}
          messageList={null}
        />
      </div>
    </div>
  )
}
