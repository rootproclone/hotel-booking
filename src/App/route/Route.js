import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReservationForm from "../../Screen/ReservationForm";
import "../../App.css";
import BookingList from "../../Screen/BookingList";
import Navigation from "../../Screen/Navigation";

function Router() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<ReservationForm />} />
          <Route path="/booking-list" element={<BookingList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default Router;
