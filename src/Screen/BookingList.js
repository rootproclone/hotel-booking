import React, { useState, useEffect } from "react";
import BookingTable from "./BookingTable";
import { db } from "../App/Firebase/firebase"; // Import your Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import EditTable from "./EditTable";

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []); // The empty dependency array means this effect runs once after the initial render
    // Function to fetch and set the bookings data
    const fetchBookings = async () => {
      try {
        const bookingsCollection = collection(db, "bookings");
        const querySnapshot = await getDocs(bookingsCollection);

        const bookingsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          const booking = { id, ...data };
          bookingsData.push(booking);
        });

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error getting bookings: ", error);
      }
    };

    // Call the function to fetch bookings when the component mounts
    fetchBookings();

  return (
    <div className="booking-table-container">
      <BookingTable
        bookings={bookings}
        onReFresh={fetchBookings} // Pass the function to refresh data
      />
    </div>
  );
}

export default BookingList;
