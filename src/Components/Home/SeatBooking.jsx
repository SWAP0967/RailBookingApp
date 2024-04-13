import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Pagination } from "antd";
import { FaRupeeSign } from "react-icons/fa";
import {
  fetchSeatDetailsFailure,
  fetchSeatDetailsRequest,
  fetchSeatDetailsSuccess,
  setToStationCode,
  setTrainNumber,
  setfromstation,
} from "../../Redux/Action_Creators/ActionCreators";
import { apiHeaders, getfairdetails } from "../../Api";

function SeatBooking() {
  const dispatch = useDispatch();
  const selectedTrainNumber = useSelector(
    (state) => state.Irctc.selectedTrainNumber
  );
  const fromStationCode = useSelector(
    (state) => state.Irctc.enteredFromLocation
  );
  const toStationCode = useSelector((state) => state.Irctc.toStationCode);
  const seatDetails = useSelector((state) => state.Irctc.seatDetails);
  const seatLoading = useSelector((state) => state.Irctc.seatLoading);
  const seatError = useSelector((state) => state.Irctc.seatError);
    // eslint-disable-next-line
  const [bookingMessage, setBookingMessage] = useState(null);
  // eslint-disable-next-line
  const [selectedSeat, setSelectedSeat] = useState(null);
  // eslint-disable-next-line
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [currentPageClassTypes, setCurrentPageClassTypes] = useState(1);
  const itemsPerPageClassTypes = 1;
  const { trainNumber, fromStation, toStation } = useParams();
  const fetchSeatDetails = useCallback(
    async (trainNumber, fromStation, toStation) => {
      try {
        dispatch(fetchSeatDetailsRequest());
        const url = getfairdetails(trainNumber, fromStation, toStation);
        const options = {
          method: "GET",
          headers: apiHeaders,
        };

        const response = await fetch(url, options);
        const seatDetails = await response.json();

        if (response.ok) {
          dispatch(fetchSeatDetailsSuccess(seatDetails));
          setBookingMessage(null);
        } else {
          dispatch(
            fetchSeatDetailsFailure(
              "Error fetching seat details. Please try again."
            )
          );
          setBookingMessage("Error fetching seat details. Please try again.");
        }
      } catch (error) {
        dispatch(
          fetchSeatDetailsFailure(
            "Error fetching seat details. Please try again."
          )
        );
        setBookingMessage("Error fetching seat details. Please try again.");
      }
    },
    [dispatch, setBookingMessage]
  );

  useEffect(() => {
    dispatch(setTrainNumber(selectedTrainNumber));
    dispatch(setfromstation(fromStationCode));
    dispatch(setToStationCode(toStationCode));
    if (trainNumber && fromStation && toStation) {
      fetchSeatDetails(trainNumber, fromStation, toStation);
    }
  }, [
    dispatch,
    selectedTrainNumber,
    fromStationCode,
    toStationCode,
    trainNumber,
    fromStation,
    toStation,
    fetchSeatDetails,
  ]);
  const handleCardClick = (seat, quota) => {
    setBookingMessage(null);
    setSelectedSeat(seat);
    setSelectedQuota(quota);
  };
const totalClassTypes = seatDetails?.data
    ? Object.keys(seatDetails.data).length
    : 0;

  const paginateClassTypes = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalClassTypes) {
      setCurrentPageClassTypes(pageNumber);
    }
  };

  return (
    <div style={{ marginLeft: "5rem" }}>
      {seatLoading }
      {seatError && <div>Error: {seatError}</div>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "8rem",
          marginBottom: "2rem",
        }}
      >
        {seatDetails && seatDetails.data && (
          <>
            <Card
              key={currentPageClassTypes}
              style={{
                width: "81%",
                marginLeft: "9rem",
              }}
            >
              <div>
                <h2 style={{ color: "orange", fontSize: "3rem" }}>
                  {" "}
                  (
                  {Object.keys(seatDetails.data)[
                    currentPageClassTypes - 1
                  ].toUpperCase()}
                  )
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {Object.values(seatDetails.data)[currentPageClassTypes - 1].map(
                  (category, categoryIndex) => (
                    <Card
                      key={categoryIndex}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 10,
                        width: 300,

                        backgroundColor:
                          categoryIndex % 2 === 0
                            ? "rgba(255, 221, 225, 0.7)"
                            : "#e0e0e0",
                      }}
                      onClick={() =>
                        handleCardClick(
                          category,
                          Object.keys(seatDetails.data)[
                            currentPageClassTypes - 1
                          ]
                        )
                      }
                    >
                      <div>
                        <h3
                          style={{
                            backgroundColor: "#ee267d",
                            color: "white",
                            fontWeight: 700,
                            padding: "15px",
                            display: "inline-block",
                            borderRadius: "0px 30px 30px 30px",
                          }}
                        >
                          {category.classType}
                        </h3>
                        {category.breakup &&
                          category.breakup.map((fareDetails, fareIndex) => (
                            <p key={fareIndex}>
                              {fareDetails.title}: <FaRupeeSign />
                              {fareDetails.cost}
                            </p>
                          ))}
                      </div>
                      <Link
                        to={`/TicketDisplay?classType=${encodeURIComponent(
                          category.classType
                        )}&quota=${encodeURIComponent(
                          Object.keys(seatDetails.data)[
                            currentPageClassTypes - 1
                          ]
                        )}&fareCost=${encodeURIComponent(
                          category.breakup.map((fare) => fare.cost).join(",")
                        )}&fareTitle=${encodeURIComponent(
                          category.breakup.map((fare) => fare.title).join(",")
                        )}`}
                      >
                        <Button
                          disabled={
                            !category ||
                            !category.breakup ||
                            category.breakup.length === 0
                          }
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
                        >
                          BOOK NOW
                        </Button>
                      </Link>
                    </Card>
                  )
                )}
              </div>
            </Card>
          </>
        )}
      </div>
      <Pagination
        style={{ textAlign: "center" }}
        current={currentPageClassTypes}
        pageSize={itemsPerPageClassTypes}
        total={totalClassTypes}
        onChange={paginateClassTypes}
      />
    </div>
  );
}
export default SeatBooking;
