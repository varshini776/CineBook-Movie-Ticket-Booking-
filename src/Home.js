import React from 'react';
import './Home.css';
import { useNavigate,useParams } from 'react-router-dom';

const movies = [
  {
    poster: "https://m.media-amazon.com/images/M/MV5BMDNlZTg4YmEtY2YwNi00NzZjLTk1YTAtYTMzMTEzYjE1YjZhXkEyXkFqcGdeQXVyNjM5NTQzOTY@._V1_.jpg",
    name: "Singham Again",
    rating: "6.7/10",
    votes: "154.6K Votes",
    genre: "Action/Drama"
  },
  {
    poster: "https://m.media-amazon.com/images/M/MV5BYjNhYzBlYzktMmFkYy00YjA2LWE2MTItMWUyMTBlNmZkN2QzXkEyXkFqcGdeQXVyMTIzMDE1NDI@._V1_.jpg",
    name: "Bhool Bhulaiyaa 3",
    rating: "6.1/10",
    votes: "180.3K Votes",
    genre: "Comedy/Horror"
  },
  {
    poster: "https://m.media-amazon.com/images/M/MV5BMmQ3ZGY1OTItNzJlOC00ZDQ2LThhNGItODdiOTMzNzUzMzQzXkEyXkFqcGdeQXVyOTQxNzM2NzM@._V1_.jpg",
    name: "Kanguva",
    rating: "6.5/10",
    votes: "94.9K Votes",
    genre: "Action/Adventure/Fantasy/Period"
  },
  {
    poster: "https://m.media-amazon.com/images/M/MV5BNmY0N2QwOGEtNTI3OC00ZGE4LWI5MTktNjI3OTk4NjcwNzQ0XkEyXkFqcGdeQXVyODIxNjA4NjI@._V1_.jpg",
    name: "The Sabarmati Report",
    rating: "8.2/10",
    votes: "11K Votes",
    genre: "Drama/Historical"
  },
  {
    poster: "https://m.media-amazon.com/images/M/MV5BZjM0MjE4YzYtZjhhOC00NjM3LWIxMGQtNzM3NDI3YjI1ZmVmXkEyXkFqcGdeQXVyMzY0MTAzNjY@._V1_.jpg",
    name: "Ajab Raat Ni Gajab Vaat",
    rating: "7.6/10",
    votes: "520 Votes",
    genre: "Adventure/Comedy/Romantic"
  },
  // Add 15 more movie objects here
];
const { id } = useParams()
const func=(movie)=>{
  const navigate=useNavigate()
  const response=fetch('http://localhost:5000/home',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({movie.name,id})
  })

  data=response.json()
  if(response.ok)
  {
    console.log('record saved')
    navigate('./Showtime')
  }
  else {
    console.error(data.message);
  }
}
const Home = () => {
  return (
    <div className="movie-gallery" >
      {movies.map((movie, index) => (
        <div className="movie-card" key={index} onClick={func(movie)}>
          <img src={movie.poster} alt={movie.name} />
          <div className="movie-info">
            <h4>{movie.name}</h4>
            <p className="rating">{movie.rating} <span>{movie.votes}</span></p>
            <p>{movie.genre}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
