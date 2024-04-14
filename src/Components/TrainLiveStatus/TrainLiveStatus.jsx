import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Card, Col, Row, Modal } from "antd";
import { FaTrainSubway } from "react-icons/fa6";
import {
  fetchLiveTrainStatusFailure,
  fetchLiveTrainStatusRequest,
  fetchLiveTrainStatusSuccess,
  livetrainnumber,
} from "../../Redux/Action_Creators/ActionCreators";
import { Link } from "react-router-dom";
import { getLiveTrainStatusUrl } from "../../Api";

function TrainLiveStatus() {
  const dispatch = useDispatch();
  const statusnumber = useSelector((state) => state.Irctc.statusnumber);
  const loggedInUser = useSelector((state) => state.Irctc.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleFetchLiveTrainStatus = async () => {
    try {
      dispatch(fetchLiveTrainStatusRequest());
      const { url, headers } = getLiveTrainStatusUrl(statusnumber);
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch live train status");
      }

      const data = await response.json();
      dispatch(fetchLiveTrainStatusSuccess(data));
    } catch (error) {
      dispatch(fetchLiveTrainStatusFailure(error.message));
    }
  };

  const handleGetLiveTrainStatus = () => {
    if (!loggedInUser.username) {
      setShowSignUpModal(true);
    } else {
      handleFetchLiveTrainStatus();
    }
  };
   
 // eslint-disable-next-line
  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleLoginSuccess = () => {
    setShowSignUpModal(false);
    handleFetchLiveTrainStatus();
  };

  return (
    <div style={{ padding: "10rem" }}>
      <Row justify="center" style={{ marginLeft: "50px" }}>
        <Col span={10} style={{ marginLeft: "160px" }}>
          <Card
            style={{
              background:
                "linear-gradient(to left, #FF61D2 0%, #FE9090 50%, #FF61D2 100%)",
            }}
          >
            <Row justify="center">
              <h1 style={{ fontFamily: "serif", padding: "0px" }}>
                Live Train Status
              </h1>
              <div>
                <Input
                  placeholder="Enter The Train Number"
                  prefix={<FaTrainSubway style={{ fontSize: "2rem" }} />}
                  value={statusnumber}
                  onChange={(e) => dispatch(livetrainnumber(e.target.value))}
                />
              </div>
              <Button
                style={{
                  height: "4.2rem",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  borderWidth: "4px",
                  borderRadius: "7px",
                  backgroundColor: "green",
                  fontWeight: 700,
                }}
                disabled={!statusnumber}
                onClick={handleGetLiveTrainStatus}
              >
                <Link
                  to="/TrainLiveResponse"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  Get Live Status
                </Link>
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Please sign up to access this feature"
        visible={showSignUpModal}
        onCancel={() => setShowSignUpModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowSignUpModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>{" "}
          </p>
          <p>
            Already a user <Link to="/login" onClick={handleLoginSuccess}>Login</Link>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default TrainLiveStatus;
