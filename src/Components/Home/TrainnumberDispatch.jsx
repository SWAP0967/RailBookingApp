import React, { useState, useEffect } from "react";
import { Card, Pagination, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedClass,
  fetchClassDetailsSuccess,
  fetchClassDetailsFailure,
  selectedtraintime,
  setTrainNumber,
} from "../../Redux/Action_Creators/ActionCreators";
import { getTrainnumUrl, apiHeaders } from "../../Api";
function TrainnumberDispatch() {
  const dispatch = useDispatch();
  const trainList = useSelector((state) => state.Irctc.fetchedtrainlist);
  const fetchTrainListError = useSelector(
    (state) => state.Irctc.fetchTrainListError
  );
  const selectedTime = useSelector((state) => state.Irctc.fetchedtime);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  useEffect(() => {
    if (fetchTrainListError && Object.keys(fetchTrainListError).length !== 0) {
      dispatch(fetchClassDetailsFailure("")); 
    }
  }, [fetchTrainListError, dispatch]);

  useEffect(() => {
    if (selectedTime) {
    }
  }, [selectedTime]);

  const handleTrainClick = async (train) => {
    try {
      const url = getTrainnumUrl(train);
      const options = {
        method: "GET",
        headers: apiHeaders,
      };

      const response = await fetch(url, options);
      const classDetailsResponse = await response.json();

      if (classDetailsResponse.status === true) {
        const classDetails = classDetailsResponse.data;

        dispatch(setSelectedClass(classDetails.class_type));
        dispatch(fetchClassDetailsSuccess(train.train_number, classDetails));
        dispatch(selectedtraintime(train.from_sta));
        dispatch(setTrainNumber(train.train_number));
        setErrorMessage(null);
      } else {
        dispatch(
          fetchClassDetailsFailure(
            "Error fetching class details. Please try again."
          )
        );
        setErrorMessage("Error fetching class details. Please try again.");
      }
    } catch (error) {
      dispatch(
        fetchClassDetailsFailure(
          "Error fetching class details. Please try again."
        )
      );
      setErrorMessage("Error fetching class details. Please try again.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = trainList.slice(startIndex, endIndex);

  return (
    <div style={{ paddingTop: "115px" }}>
      {fetchTrainListError && (
         <p
         style={{
           color: "red",
           fontWeight: 700,
           fontSize: "1rem",
           display: "flex",
           justifyContent: "center",
           textAlign: "center",
           alignItems: "center",
           position: "fixed",
           top: "50%",
           left: "45%",
         }}
       > {fetchTrainListError}
       </p>
      )}
      {!errorMessage &&
        currentData.map((train) => (
          <Link
          style={{ textDecoration: "none" }}
            key={`${train.train_number}-${train.from}-${train.to}`}
            to={`/seatBooking/${train.train_number}/${train.from}/${train.to}`}
          >
            <Row justify="center">
              <Col span={20}>
                <Card
                  className="bookingcard"
                  onClick={() => handleTrainClick(train)}
                  key={train.train_number}
                  style={{
                    marginBottom: "5px",
                    marginLeft: "15rem",
                    background:
                      "linear-gradient(to bottom, #FE9080 30%, #CFD9DF 30%)",
                  }}
                >
                  <div style={{ paddingBottom: "3rem", fontWeight: 700 }}>
                    <h3 style={{ display: "flex", justifyContent: "center" }}>
                      {train.train_name} ({train.train_number} )
                    </h3>
                  </div>

                  <div
                    style={{
                      color: "green",
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{train.run_days.join(" , ")}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.2rem",
                        margin: "10px",
                        borderRadius: "10px",
                        textAlign: "center",
                        borderBottom: "2px solid black",
                      }}
                    >
                      {train.from}
                      <span style={{ margin: "8px" }}>-</span>
                      {train.from_station_name}{" "}
                      <span style={{ margin: "8px" }}>|</span>
                      <strong>{train.from_std}</strong>
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <hr
                        style={{
                          width: "2rem",
                          border: "1px solid black",
                        }}
                      />
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          {train.duration}
                        </span>
                      </p>
                      <hr
                        style={{
                          width: "2rem",
                          border: "1px solid black",
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontSize: "1.2rem",
                        margin: "10px",
                        borderRadius: "7px",
                        textAlign: "center",
                        borderBottom: "2px solid black",
                      }}
                    >
                      {train.to}
                      <span style={{ margin: "8px" }}>-</span>
                      {train.to_station_name}{" "}
                      <span style={{ margin: "8px" }}>|</span>
                      <strong>{train.to_std}</strong>{" "}
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Link>
        ))}
       {!fetchTrainListError && (
        <Pagination
          current={currentPage}
          total={trainList.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      )}
    </div>
  );
}
export default TrainnumberDispatch;



