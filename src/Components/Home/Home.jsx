import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrainListFailure,
  fetchTrainListSuccess,
  setdate,
  setfromstation,
  settostation,
} from "../../Redux/Action_Creators/ActionCreators";
import { Card, Col, Row, Space, DatePicker, Input, Button, Modal } from "antd";
import { SendOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { FaTrainSubway } from "react-icons/fa6";
import { getTrainBetweenStationsUrl, apiHeaders } from "../../Api";
import LoadingSpinner from "../LoadingSpinner";
import { MdPayment } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const fromStation = useSelector((state) => state.Irctc.enteredFromLocation);
  const toStation = useSelector((state) => state.Irctc.enteredToLocation);
  const [journeyDate, setJourneyDate] = useState(null);
  const loggedInUser = useSelector((state) => state.Irctc.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleDateChange = (date) => {
    setJourneyDate(date);
    dispatch(setdate(date));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (
        !fromStation ||
        !toStation ||
        !journeyDate ||
        !journeyDate.isValid()
      ) {
        setError("Please fill in all the required fields.");
        return;
      }
      const formattedDate = journeyDate.format("YYYY-MM-DD");
      const url = getTrainBetweenStationsUrl(
        fromStation,
        toStation,
        formattedDate
      );
      const options = {
        method: "GET",
        headers: apiHeaders,
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!responseData.data || responseData.data.length === 0) {
        setError("No trains found for the selected criteria.");
        dispatch(
          fetchTrainListFailure("No trains found for the selected criteria.")
        );
        return;
      }
      const filteredData = responseData.data || [];
      dispatch(fetchTrainListSuccess(filteredData));
      setError("");
    } catch (error) {
      dispatch(fetchTrainListFailure(error));
      setError("Error fetching train details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled =
    fromStation && toStation && journeyDate && journeyDate.isValid();

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowSignUpModal(true);
  };

  return (
    <div>
      <Row justify="end">
        <div className="content">
          <h2
            style={{
              textAlign: "center",
              paddingTop: 65,
              margin: "35px 140px 40px 6px",
            }}
          >
            <p className="font">
              {" "}
              Enhance your travel experience by making it more
            </p>
            <p className="font"> comfortable and enjoyable...</p>
          </h2>
        </div>
      </Row>
      <Row justify="center">
        <Col style={{ marginLeft: "14rem" }}>
          <Card
            className="homecard"
            style={{
              background:
                "linear-gradient(to left, #FF61D2 0%, #FE9090 50%, #FF61D2 100%)",
            }}
          >
            <h1
              style={{
                fontFamily: "serif",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            >
              BOOK YOUR TICKET
            </h1>
            <Row style={{ justifyContent: "space-between" }}>
              <div>
                <Input
                  placeholder="From"
                  prefix={<SendOutlined style={{ fontSize: "1.2rem" }} />}
                  onChange={(e) => dispatch(setfromstation(e.target.value))}
                />
              </div>
              <div>
                <Input
                  placeholder="To"
                  prefix={
                    <EnvironmentOutlined style={{ fontSize: "1.2rem" }} />
                  }
                  onChange={(e) => dispatch(settostation(e.target.value))}
                />
              </div>
              <div id="dateinputs">
                <Space style={{ marginBottom: "60px" }}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ fontSize: "1.5rem" }}
                    onChange={handleDateChange}
                  />
                </Space>
              </div>
              <div>
                <Link to="/TrainnumberDispatch">
                  <Button
                    style={{
                      color: "#FFFFFF",
                      lineHeight: "20px",
                      fontSize: "1rem",
                      width: "10rem",
                      height: "4rem",
                      borderWidth: "4px",
                      borderRadius: "7px",
                      backgroundColor: "green",
                      fontWeight: 700,
                    }}
                    disabled={!isFormFilled || loading}
                    onClick={
                      loggedInUser.username ? handleSearch : handleSignUp
                    }
                  >
                    {loading ? <LoadingSpinner /> : "Find Trains"}
                  </Button>
                </Link>
              </div>
              <p id="error">{error}</p>
            </Row>
          </Card>
        </Col>
      </Row>
      <div style={{ marginLeft: "20rem" }}>
        <h3>Why Book From RailBooking?</h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            class="card"
            style={{ position: "relative", borderTop: "65px solid lightblue" }}
          >
            <FaTrainSubway
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "2.6rem",
              }}
            />
            <div class="para para1">
              <p>Get Train updates on live status, seats, and names.</p>
            </div>
          </div>
          <div
            class="card"
            style={{ position: "relative", borderTop: "65px solid lightgreen" }}
          >
            <FcClock
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "2.6rem",
              }}
            />
            <div class="para para2">
              <p>Book your ticket in just seconds!</p>
            </div>
          </div>
          <div
            class="card"
            style={{
              position: "relative",
              borderTop: "65px solid lightsalmon",
            }}
          >
            <MdPayment
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "2.6rem",
              }}
            />
            <div class="para para3">
              <p>Ensure your data privacy and make secure payments</p>
            </div>
          </div>
        </div>
      </div>
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
            Don't have an account? <a href="/signup">Sign Up</a>{" "}
          </p>
          <p>
            Already a user <a href="/login">Login</a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
