import React from "react";
import { connect } from "react-redux";
import "./portal.css";
import { Button, Popconfirm } from "antd";
import Operations from "./Operations";
import Clock from "./Clock";
import Alert from "../../common/Alert";
// import apis from "../../../services/Apis";
// import { Post } from "../../../services/axiosCall";
// import { fetchTestdata } from "../../../actions/traineeAction";

class Sidepanel extends React.Component {
  endTest = () => {
    // Post({
    //     url:`${apis.END_TEST}`,
    //     data:{
    //         testid: this.props.trainee.testid,
    //         userid:this.props.trainee.traineeid
    //     }
    // }).then((response)=>{
    //     if(response.data.success){
    //         this.props.fetchTestdata(this.props.trainee.testid,this.props.trainee.traineeid)
    //     }
    //     else{
    //         return Alert('error','Error!',response.data.message);
    //     }
    // }).catch((error)=>{
    //     return Alert('error','Error!','Error');
    // })
  };

  render() {
    return (
      <div
        className={
          "side-panel-in-exam-dashboard " +
          (this.props.mode === "desktop" ? "w-20" : "w-100")
        }
      >
        <div className="loggedin-trainee-container">
          <div className="loggedin-trainee-inner">
            <img
              alt="User Icon"
              src="#"
              className="loggedin-trainee-logo"
            />
            <div className="loggedin-trainee-details-container">
              <p>avdv</p>
            </div>
          </div>
        </div>
        <Clock />
        <Operations />
        <div className="End-test-container">
          <Popconfirm
            title="Are you sure to end the test"
            onConfirm={this.endTest}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default">End Test</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default Sidepanel;
