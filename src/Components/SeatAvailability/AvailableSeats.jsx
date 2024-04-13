import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Pagination } from "antd";
import { FaRupeeSign } from "react-icons/fa";
const AvailableSeats = () => {
  const { aval_success, aval_fail } = useSelector((state) => state.Irctc || {});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  if (aval_fail) {
    return (
      <p style={{ color: "red", paddingTop: "200px", textAlign: "center" }}>
        Error: {aval_fail.message} 
      </p>
    );
  }
  if (!aval_success || !aval_success.data) {
    return (
      <p style={{ color: "red",
      fontWeight: 700,
      fontSize: "1rem",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      position: "fixed",
      top: "50%",
      left: "50%",}}>
        Error: No data available
      </p>
    );
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aval_success.data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ paddingTop: "150px", marginLeft: "10rem" }}>
      <h2>SEAT AVAILABILITY DETAILS</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {currentItems.map((availability, index) => (
          <Card
            key={index}
            style={{
              margin: 20,
              width: 300,
              backgroundColor:
                index % 2 === 0 ? "rgba(255, 221, 225, 0.7)" : "#e0e0e0",
            }}
          >
            <div>
              <div>
                <p
                  style={{ color: "orange", fontWeight: 700, fontSize: "1rem" }}
                >
                  {availability.current_status}
                </p>
                <p>Catering Charge: {availability.catering_charge}</p>
                <p>
                  Confirm Probability Percentage:{" "}
                  {availability.confirm_probability_percent}
                </p>
                <p>Confirm Probability: {availability.confirm_probability}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>TOTALFAIR:{availability.alt_cnf_seat}</p>
                <button
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    lineHeight: "20px",
                    backgroundColor: "rgba(0, 200, 0, 0.9)",
                    width: "6rem",
                    borderRadius: "30px 30px 0px 30px",
                    border: "none",
                  }}
                >
                  <p style={{ fontSize: "1.3rem" }}>
                    <FaRupeeSign style={{ fontSize: "1rem" }} />
                    {availability.total_fare}
                  </p>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={aval_success.data.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};
export default AvailableSeats;


