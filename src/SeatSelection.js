/*import React, { useState, useEffect } from "react";
import "./SeatSelection.css";
import { useNavigate, useParams } from 'react-router-dom';

const seats = Array(50).fill(false);

const SeatSelection = ({ setSelectedSeats }) => {
  const [selected, setSelected] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();
  const { id, movie_title, show_time } = useParams();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/booked-seats/${movie_title}/${show_time}`);
        const data = await response.json();
        setBookedSeats(data.seats);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };
    fetchBookedSeats();
  }, [movie_title, show_time]);

  const toggleSeat = (index) => {
    if (bookedSeats.includes(index)) return; // Prevent selection of booked seats
    if (selected.includes(index)) {
      setSelected(selected.filter(seat => seat !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const confirmSeats = async () => {
    try {
      const response = await fetch('http://localhost:5000/seat', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: id, seat: selected, movie_title, show_time }),
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedSeats(selected);
        console.log(data.message);
        navigate(`/booking/${id}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Select Seats</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
        {seats.map((_, index) => (
          <div
            key={index}
            onClick={() => toggleSeat(index)}
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              backgroundColor: bookedSeats.includes(index) ? "red" : selected.includes(index) ? "green" : "gray",
              cursor: bookedSeats.includes(index) ? "not-allowed" : "pointer",
            }}
          ></div>
        ))}
      </div>
      <button onClick={confirmSeats} disabled={selected.length === 0}>Confirm Seats</button>
    </div>
  );
};

export default SeatSelection;*/

/*
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const seats = Array(50).fill(false);

const SeatSelection = ({ setSelectedSeats }) => {
  const [selected, setSelected] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); 
  const navigate = useNavigate();
  const { id, title, time } = useParams();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch("http://localhost:5000/booked-seats", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movie_title: title, show_time: time }),
        });
        const data = await response.json();
        setBookedSeats(data.seats || []); 
        console.log("Setting booked seats:", data.seats);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
        setBookedSeats([]); 
      }
    };
    fetchBookedSeats();
  }, [title, time]);

  const toggleSeat = (index) => {
    if (bookedSeats.includes(index)) return; 
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
    );
  };

  const confirmSeats = async () => {
    try {
      const response = await fetch("http://localhost:5000/seat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, seat: selected, movie_title:title, show_time:time }),
      });

      const data = await response.json();
      if (response.ok) {
        setSelectedSeats(selected);
        console.log(data.message);
        navigate(`/booking/${id}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Select Seats</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
        {seats.map((_, index) => (
          <div
            key={index}
            onClick={() => toggleSeat(index)}
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              backgroundColor: bookedSeats.includes(index)
                ? "#D34142"
                : selected.includes(index)
                ? "green"
                : "gray",
              cursor: bookedSeats.includes(index) ? "not-allowed" : "pointer",
            }}
          />
        ))}
      </div>
      <button onClick={confirmSeats} disabled={selected.length === 0}>
        Confirm Seats
      </button>
    </div>
  );
};

export default SeatSelection;
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SeatSelection.css"; // Import external CSS

const seats = Array(50).fill(false);

const SeatSelection = ({ setSelectedSeats }) => {
  const [selected, setSelected] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();
  const { id, title, time } = useParams();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch("http://localhost:5000/booked-seats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movie_title: title, show_time: time }),
        });

        const data = await response.json();
        setBookedSeats(data.seats || []);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
        setBookedSeats([]);
      }
    };
    fetchBookedSeats();
  }, [title, time]);

  const toggleSeat = (index) => {
    if (bookedSeats.includes(index)) return;
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
    );
  };

  const confirmSeats = async () => {
    try {
      const response = await fetch("http://localhost:5000/seat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, seat: selected, movie_title: title, show_time: time }),
      });

      if (response.ok) {
        setSelectedSeats(selected);
        navigate(`/booking/${id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="seat-container">
      <h2 className="title">Select Your Seats</h2>
      
      {/* Movie Screen */}
      <div className="screen">MOVIE SCREEN</div>
      
      {/* Seat Grid */}
      <div className="seats-grid">
        {seats.map((_, index) => (
          <div
            key={index}
            onClick={() => toggleSeat(index)}
            className={`seat ${bookedSeats.includes(index) ? "booked" : selected.includes(index) ? "selected" : "available"}`}
          />
        ))}
      </div>

      {/* Confirm Button */}
      <button className="confirm-btn" onClick={confirmSeats} disabled={selected.length === 0}>
        Confirm Seats
      </button>
    </div>
  );
};

export default SeatSelection;


