import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  availablityRequest,
  setSeatAvailabilityDetails,
  availabiltySuccess,
  availabiltyFailure,
  logout, 
} from "../../Redux/Action_Creators/ActionCreators"; 
import { Card, Col, Row, Space, DatePicker, Input, Button, Modal } from "antd";
import { SendOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { FaTrainSubway } from "react-icons/fa6";
import { checkSeatAvailabilityUrl, apiHeaders } from "../../Api";
import { Link } from "react-router-dom";

function SeatAvailability() {
  const dispatch = useDispatch();
  const { aval_fail, user } = useSelector((state) => state.Irctc);
  const [classType, setClassType] = useState("");
  const [fromStationCode, setFromStationCode] = useState("");
  const [quota, setQuota] = useState("");
  const [toStationCode, setToStationCode] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [date, setDate] = useState("");
  const loggedInUser = useSelector((state) => state.Irctc.user);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    setButtonDisabled(
      !trainNo ||
      !fromStationCode ||
      !toStationCode ||
      !classType ||
      !quota ||
      !date
    );
  }, [trainNo, fromStationCode, toStationCode, classType, quota, date]);

  const fetchData = async () => {
    dispatch(availablityRequest());
    try {
      const url = checkSeatAvailabilityUrl(
        classType,
        fromStationCode,
        quota,
        toStationCode,
        trainNo,
        date
      );
      const options = {
        method: "GET",
        headers: apiHeaders,
      };
      const response = await fetch(url, options);
      const result = await response.json();
      dispatch(availabiltySuccess(result));
      dispatch(setSeatAvailabilityDetails(result));
    } catch (error) {
      dispatch(availabiltyFailure(error.message));
    }
  };

  const handleSubmit = () => {
    if (user.username) {
      fetchData();
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleLoginSuccess = () => {
    setShowSignUpModal(false);
    fetchData();
  };
    // eslint-disable-next-line
    const handleLogout = () => {
    dispatch(logout()); 
  };

  useEffect(() => {
    if (!loggedInUser.username) {
      dispatch(availabiltyFailure(null)); 
    }
  }, [loggedInUser, dispatch]);

  return (
    <div style={{ paddingTop: 90 }}>
      <Row justify="center" style={{ margin: 40 }}>
        <Col span={9} style={{ marginLeft: "160px" }}>
          <Card
            style={{
              padding: "0px 30px 0px 35px",
              background:
                "linear-gradient(to left, #FF61D2 0%, #FE9090 50%, #FF61D2 100%)",
            }}
          >
            <h1 style={{ fontFamily: "serif", padding: "0px" }}>
              CHECK SEAT AVAILABILITY
            </h1>
            <div>
              <Input
                type="text"
                placeholder="Enter The TrainNumber"
                prefix={<FaTrainSubway style={{ fontSize: "1rem" }} />}
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
              />
              <Input
                type="text"
                value={fromStationCode}
                placeholder="From Station Code"
                prefix={<SendOutlined style={{ fontSize: "1rem" }} />}
                onChange={(e) => setFromStationCode(e.target.value)}
              />
              <Input
                type="text"
                placeholder=" To Station Code"
                prefix={<EnvironmentOutlined style={{ fontSize: "1rem" }} />}
                value={toStationCode}
                onChange={(e) => setToStationCode(e.target.value)}
              />
              <div>
                <Space direction="vertical">
                  <DatePicker
                    format="DD-MM-YYYY"
                    className="dateinput"
                    style={{ fontSize: "1rem" }}
                    onChange={(date, dateString) => setDate(dateString)}
                  />
                </Space>
              </div>
              <div className="seatinputs">
                <Input
                  type="text"
                  className="classinput"
                  placeholder="Enter The Class Type "
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                />
                <Input
                  type="text"
                  className="quotainput"
                  placeholder=" Quota"
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                />
              </div>
              <div style={{ justifyContent: "center", display: "flex" }}>
                {loggedInUser.username ? (
                  <Button
                    style={{
                      color: "#FFFFFF",
                      lineHeight: "20px",
                      fontSize: "1rem",
                      width: "15rem",
                      height: "4rem",
                      borderWidth: "4px",
                      borderRadius: "7px",
                      backgroundColor: "green",
                      fontWeight: 700,
                    }}
                    onClick={handleSubmit}
                    disabled={buttonDisabled}
                  >
                    <Link
                      to="/AvailableSeats"
                      style={{ color: "#FFFFFF", textDecoration: "none" }}
                    >
                      Search
                    </Link>
                  </Button>
                ) : (
                  <Button
                    style={{
                      color: "#FFFFFF",
                      lineHeight: "20px",
                      fontSize: "1rem",
                      width: "15rem",
                      height: "4rem",
                      borderWidth: "4px",
                      borderRadius: "7px",
                      backgroundColor: "green",
                      fontWeight: 700,
                    }}
                    onClick={handleSignUp}
                    disabled={buttonDisabled}
                  >
                    Search
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      {aval_fail && (
        <p style={{ color: "red", textAlign: "center" }}>
          {aval_fail.message}
        </p>
      )}
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
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
          <p>
            Already a user{" "}
            <a href="/login" onClick={handleLoginSuccess}>
              Login
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default SeatAvailability;
