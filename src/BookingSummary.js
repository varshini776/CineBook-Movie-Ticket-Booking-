import "./BookingSummary.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingSummary = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState({
    movie: { title: "" },
    showtime: { time: "" },
    seats: [],
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        console.log('called backend')
        const response = await fetch(`http://localhost:5000/booking-summary/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookingData(data);
        console.log(data)      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookingData();
  }, [id]);
const func=()=>{
  alert('Sucessfully booked a show')
}
  return (
    <div className="booking-summary-container">
      <h2>Booking Summary</h2>
      <p>Movie: {bookingData.movie.title}</p>
      <p>Showtime: {bookingData.showtime.time}</p>
      <p>Seats: {Array.isArray(bookingData.seats) ? bookingData.seats.join(", ") : "No seats selected"}</p>
  
      <p>Total Amount:{bookingData.seats.length*400}</p>
      <button onClick={func}>Confirm Payment</button>
    </div>
  );
};

export default BookingSummary;
