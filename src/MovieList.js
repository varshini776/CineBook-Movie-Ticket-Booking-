/*import React from "react";
import PropTypes from "prop-types";
import "./MovieList.css";
import { useNavigate,useParams } from "react-router-dom";

// Importing movie images
import amaranImage from "./amaran.jpeg";
import luckyBaskerImage from "./luckybaskerposter.jpeg";
import inceptionImage from "./inseption.jpeg";
import interstellarImage from "./interstellar.jpeg";
import parasiteImage from "./parasite.jpeg";

// Example movie data
const defaultMovies = [
  {
    id: 1,
    title: "Amaran",
    description: "A real army man story in Tamil Nadu",
    image: amaranImage,
  },
  {
    id: 2,
    title: "Lucky Basker",
    description: "A cash-strapped cashier working at a bank embarks on a risky investment scheme",
    image: luckyBaskerImage,
  },
  {
    id: 3,
    title: "Inception",
    description: "A skilled thief is offered a chance to have his past crimes forgiven if he implants an idea into a target's subconscious.",
    image: inceptionImage,
  },
  {
    id: 4,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: interstellarImage,
  },
  {
    id: 5,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    image: parasiteImage,
  },
];

const MovieList = ({ movies = defaultMovies, setSelectedMovie }) => {
  const { id } = useParams()
  const navigate=useNavigate()

const func=async(movie)=>{
  console.log(id,movie.title);
  const response=await fetch('http://localhost:5000/home',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id:id,movie_title: movie.title })  })

  const data=await response.json()
  if(response.ok)
  {
    console.log('record saved')
    console.log(data.message)
    navigate(`/show/${id}/${movie.title}`, { replace: true })
  }
  else {
    console.error(data.message);
  }
}
  
  return (
    <div className="movie-list-container">
      <h2>Select a Movie</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            
            onClick={() => func(movie)}
            role="button"
            tabIndex={0}
            aria-label={`Select the movie: ${movie.title}`}
            onKeyPress={(e) => e.key === "Enter" && setSelectedMovie(movie)}
          >
            {}
            <div
              className="movie-image"
              style={{
                backgroundImage: movie.image
                  ? `url(${movie.image})`
                  : "url('/fallback.jpg')", // Fallback for missing images
              }}
            ></div>

            {}
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-description">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  setSelectedMovie: PropTypes.func.isRequired,
};

export default MovieList;
*/
import React from "react";
import PropTypes from "prop-types";
import "./MovieList.css";
import { useNavigate, useParams } from "react-router-dom";

// Importing movie images
import amaranImage from "./amaran.jpeg";
import luckyBaskerImage from "./luckybaskerposter.jpeg";
import inceptionImage from "./inseption.jpeg";
import interstellarImage from "./interstellar.jpeg";
import parasiteImage from "./parasite.jpeg";

// Example movie data
const defaultMovies = [
  {
    id: 1,
    title: "Amaran",
    description: "A real army man story in Tamil Nadu",
    image: amaranImage,
  },
  {
    id: 2,
    title: "Lucky Basker",
    description: "A cash-strapped cashier working at a bank embarks on a risky investment scheme",
    image: luckyBaskerImage,
  },
  {
    id: 3,
    title: "Inception",
    description: "A skilled thief is offered a chance to have his past crimes forgiven if he implants an idea into a target's subconscious.",
    image: inceptionImage,
  },
  {
    id: 4,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: interstellarImage,
  },
  {
    id: 5,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    image: parasiteImage,
  },
];

const MovieList = ({ movies = defaultMovies, setSelectedMovie }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const func = async (movie) => {
    console.log(id, movie.title);
    const response = await fetch('http://localhost:5000/home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: id, movie_title: movie.title })
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Record saved');
      console.log(data.message);
      // Navigate to showtime selection page with movie_title in URL
      navigate(`/show/${id}/${movie.title}`, { replace: true });
    } else {
      console.error(data.message);
    }
  };

  return (
    <div className="movie-list-container">
      <h2>Select a Movie</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => func(movie)}
            role="button"
            tabIndex={0}
            aria-label={`Select the movie: ${movie.title}`}
            onKeyPress={(e) => e.key === "Enter" && setSelectedMovie(movie)}
          >
            <div
              className="movie-image"
              style={{
                backgroundImage: movie.image
                  ? `url(${movie.image})`
                  : "url('/fallback.jpg')",
              }}
            ></div>
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-description">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  setSelectedMovie: PropTypes.func.isRequired,
};

export default MovieList;
