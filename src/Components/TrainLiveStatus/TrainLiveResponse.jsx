import React from "react";
import { useSelector } from "react-redux";
import { Card, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
function TrainLiveResponse() {
        // eslint-disable-next-line
 const statusloading = useSelector((state) => state.Irctc.statusloading);
  const stationData = useSelector((state) => state.Irctc.statusdata);
  const statuserror = useSelector((state) => state.Irctc.statuserror);

  return (
    <div>
      {statuserror && (
        <p style={{
          color: "red",
          fontWeight: 700,
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
        }}>Error: {statuserror}</p>
      )}

      {stationData && stationData.stationData && (
        <div
          style={{
            display: "flex",
            marginLeft: "200px",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            paddingTop: 30,
            background: "linear-gradient(45deg, #209cff, #68e0cf)",
          }}
        >
          <Col span={12}>
            <Card style={{ height: "80vh", overflowY: "auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  background: "#E2D1C3",
                  position: "sticky",
                  top: "0",
                  zIndex: 1,
                  fontFamily: "serif",
                }}
              >
                <h3>Arrivals</h3>
                <h3>StationName</h3>
                <h3>Departure</h3>
                <h3>Delay</h3>
              </div>
              {stationData.stationData.map((station, index) => (
                <section id="conference-timeline" key={index}>
                  <div class="conference-center-line"></div>
                  <div class="conference-timeline-content">
                    <div class="timeline-art">
                      <div class="content-left-container">
                        <div class="content-left">
                          <p
                            style={{
                              color: "green",
                              fontWeight: 700,
                              fontSize: "1rem",
                            }}
                          >
                            {station.arrives}
                          </p>
                        </div>
                      </div>
                      <div class="content-right-container">
                        <div
                          class="content-right"
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <p
                            style={{
                              color: "#596164",
                              fontWeight: 700,
                              fontSize: "1rem",
                            }}
                          >
                            {station.name}
                          </p>
                          <p
                            style={{
                              color: "green",
                              fontWeight: 700,
                              fontSize: "1rem",
                            }}
                          >
                            {station.departs}
                          </p>
                          <p
                            style={{
                              color: "#C33764",
                              fontWeight: 700,
                              fontSize: "1rem",
                            }}
                          >
                            {station.late}
                          </p>
                        </div>
                      </div>
                      <div class="meta-date">
                        <span class="date">
                          <EnvironmentOutlined
                            style={{ color: "red", fontSize: "1rem" }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </Card>
          </Col>
        </div>
      )}
    </div>
  );
}

export default TrainLiveResponse;
