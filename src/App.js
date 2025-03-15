/*import React,{useState} from "react";
import Signup from './Signup'
import Login from './Login'
import Forgot from './Forgot'
import BookingSummary from './BookingSummary'
import MovieList from './MovieList'
import SeatSelection from './SeatSelection'
import Showtimes from './Showtimes'
import Admin from './Admin'
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Signup/>}></Route> 
      <Route path='/login' element={<Login/>}></Route>  
      <Route path='/forgot' element={<Forgot/>}></Route>
      <Route path='/home/:id' element={<MovieList
          
          setSelectedMovie={setSelectedMovie}
          />
      }></Route>
            <Route path='/show/:id/:title' element={<Showtimes  
           movie={selectedMovie}
                setSelectedShowtime={setSelectedShowtime}
      
          />
      }></Route>
      
            <Route path='/seat/:id' element={<SeatSelection
                
          setSelectedSeats={setSelectedSeats}
          />
      }></Route>
            <Route path='/booking/:id' element={<BookingSummary
                movie={selectedMovie}
                showtime={selectedShowtime}
                seats={selectedSeats}
              />
      }></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

*/
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import BookingSummary from "./BookingSummary";
import MovieList from "./MovieList";
import SeatSelection from "./SeatSelection";
import Showtimes from "./Showtimes";
import Admin from "./Admin";

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/home/:id" element={<MovieList />} />

          
          <Route path="/show/:id/:title" element={<Showtimes />} />

         
          <Route path="/seat/:id/:title/:time" element={<SeatSelection setSelectedSeats={setSelectedSeats} />} />

        
          <Route path="/booking/:id" element={<BookingSummary seats={selectedSeats} />} />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
