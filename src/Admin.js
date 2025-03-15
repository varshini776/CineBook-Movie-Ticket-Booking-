import React, { useState } from "react";
import "./Admin.css";

const defaultMovies = [
  { id: 1, title: "Amaran", description: "A real army man story in Tamil Nadu" },
  { id: 2, title: "Lucky Basker", description: "A bank cashier embarks on a risky investment scheme" },
  { id: 3, title: "Inception", description: "A skilled thief implants ideas into a target's subconscious" },
  { id: 4, title: "Interstellar", description: "Explorers travel through a wormhole to ensure humanity's survival" },
  { id: 5, title: "Parasite", description: "Greed and class discrimination disrupt a symbiotic relationship" },
];

const Admin = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie.title);
    setMovieDetails(null);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/admin/${movie.title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);
      } else {
        setError("No bookings found for this movie.");
      }
    } catch (error) {
      setError("Failed to fetch movie details.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="movie-list">
        {defaultMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie)}
          >
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>

      {selectedMovie && <h2>Details for: {selectedMovie}</h2>}

      {movieDetails && (
        <div className="movie-details">
          <h3>Users and Seats:</h3>
          <ul>
            {movieDetails.users.map((user, index) => (
              <li key={index}>
                <strong>Name:</strong> {user.name}, <strong>Seats:</strong>{" "}
                {user.seats.length > 0 ? user.seats.join(", ") : "None"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Admin;
