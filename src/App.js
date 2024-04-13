import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Authentication/Login";
import LoadingSpinner from "./Components/LoadingSpinner";
import SeatAvailability from "./Components/SeatAvailability/SeatAvailability";
import TrainSearch from "./Components/TrainSearch/TrainSearch";
import TrainList from "./Components/TrainList/TrainList";
import TrainLiveStatus from "./Components/TrainLiveStatus/TrainLiveStatus";
import TrainLiveResponse from "./Components/TrainLiveStatus/TrainLiveResponse";
import TrainnumberDispatch from "./Components/Home/TrainnumberDispatch";
import SeatBooking from "./Components/Home/SeatBooking";
import SignUp from "./Components/Authentication/SignUp";
import AvailableSeats from "./Components/SeatAvailability/AvailableSeats";
import TicketDisplay from "./Components/Home/TicketDisplay";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/*"
              element={<>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/SearchTrain" element={<TrainSearch />} />
                  <Route path="/TrainList" element={<TrainList />} />
                  <Route path="/SeatAvailability" element={<SeatAvailability />} />
                  <Route path="/AvailableSeats" element={<AvailableSeats />} />
                  <Route path="/TrainLiveStatus" element={<TrainLiveStatus />} />
                  <Route path="/TrainLiveResponse" element={<TrainLiveResponse />} />
                  <Route path="/TrainnumberDispatch" element={<TrainnumberDispatch />} />
                  <Route path="/SeatBooking/:trainNumber/:fromStation/:toStation" element={<SeatBooking />} />
                  <Route path="/TicketDisplay" element={<TicketDisplay />} />
                </Routes>
              </>}
            />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;


