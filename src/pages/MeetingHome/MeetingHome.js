import React from "react";
import "./MeetingHome.scss";
import { useHistory } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLE_MODERATOR } from "../../utils/constants";
import { 
  faVideo, 
  faKeyboard, 
  faQuestionCircle,
  faExclamationCircle,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";

export default function MeetingHome() {
  const currentUser = authService.getCurrentUser();
  const isModerator = currentUser.roles.includes(ROLE_MODERATOR);
  const history = useHistory();

  const startCall = () => {
    const uid = shortid.generate();
    history.push(`meeting/${uid}`);
  };

  return (
    <div className="home-page">
      <header>
        <div className="header">
          <div className="logo">
            <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png" onClick={() => { history.push('/')}}/>
            <span className="help-text">Meet</span>
          </div>
          <div className="action-btn">
            <FontAwesomeIcon className="icon-block" icon={faQuestionCircle} />
            <FontAwesomeIcon
              className="icon-block"
              icon={faExclamationCircle}
            />
            <FontAwesomeIcon className="icon-block" icon={faCog} />
          </div>
        </div>
      </header>
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <div className="action-btn">
              {
                isModerator
                ?
                <button className="btn green" onClick={startCall}>
                  <FontAwesomeIcon className="icon-block" icon={faVideo} />
                  New Meeting
                </button>
                :
                ''
              }
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="">Learn more</a> about Google Meet
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
