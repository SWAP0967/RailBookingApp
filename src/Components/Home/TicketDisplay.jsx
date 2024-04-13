import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Row, List } from "antd";
import image from "../../Asserts/travel.jpg";
import travelimage from "../../Asserts/travel2.jpg";
import dayjs from "dayjs";
function TicketDisplay() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trainNumber = useSelector((state) => state.Irctc.gettrainnum);
  const from = useSelector((state) => state.Irctc.enteredFromLocation);
  const to = useSelector((state) => state.Irctc.enteredToLocation);
  const selectedClass = useSelector((state) => state.Irctc.selectedClass);
  const selectedQuota = useSelector((state) => state.Irctc.quotaoption);
  const selectedTime = useSelector((state) => state.Irctc.fetchedtime);
  const journeyDate = useSelector((state) =>
    state.Irctc.journeyDate
      ? dayjs(state.Irctc.journeyDate).format("MMMM DD, YYYY")
      : ""
  );
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (bookingSuccess) {
      timer = setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [bookingSuccess]);

  const listItems = [
    `Train Number:   ${trainNumber}`,
    `From Station:   ${from}`,
    `To Station:   ${to}`,
    `Class:   ${queryParams.get("classType") || selectedClass}`,
    `Quota:   ${queryParams.get("quota") || selectedQuota}`,
    `Timing:   ${selectedTime}`,
    `Journey Date:   ${journeyDate}`,
  ];

  return (
    <div style={{ margin: "0 0 0 18rem ", paddingTop: "90px" }}>
      <h2
        style={{
          fontFamily: "serif",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        PLEASE COLLECT YOUR TICKET
      </h2>
      <Row>
        <Col span={7}>
          <img style={{ width: "100%" }} src={image} alt="Train Journey" />
        </Col>

        <Col span={9} style={{ padding: 30 }}>
          <List size="large" bordered>
            {listItems.map((item, index) => (
              <List.Item
                key={index}
                style={{
                  background: index % 2 === 0 ? "#868F96" : "#E2D1C3",
                  fontWeight: 700,
                }}
              >
                {item}
              </List.Item>
            ))}
          </List>
        </Col>

        <Col span={8}>
          <img style={{ width: "100%" }} src={travelimage} alt="Journey" />
        </Col>
      </Row>
      {bookingSuccess && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            animation: "blinking 1s infinite",
          }}
        >
          Successfully Booked!
        </div>
      )}

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "3rem",
          color: "#ED1E79",
          fontWeight: 700,
          fontFamily: "serif",
          marginTop: "-1rem",
        }}
      >
        Happy Journey.........!
      </h1>
    </div>
  );
}
export default TicketDisplay;
