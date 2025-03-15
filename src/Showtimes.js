/*import React from "react";
import { useNavigate,useParams } from "react-router-dom";

const showtimes = [
  { id: 1, time: "12:00 PM" },
  { id: 2, time: "03:00 PM" },
  { id: 3, time: "06:00 PM" },
];

const Showtimes = ({ movie, setSelectedShowtime }) => {
  const { id } = useParams()
  const {title}=useParams()
  const navigate=useNavigate()

  const func=async(showtime)=>{
    const response=await fetch('http://localhost:5000/show',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id:id,show_time:showtime.time })  })

      const data=await response.json()
      if(response.ok)
        {
          if(data.message===' time add')
          {console.log(data.message)
            navigate(`/seat/${id}`)}
            else{
              alert(data.message)
            }
        }
        else {
          console.error(data.message);
        }
      
  }
  return (
    <div>
      <h2>Select Showtime for {title}</h2>
      {showtimes.map((showtime) => (
        <div key={showtime.id} onClick={() => func(showtime)}>
          <p>{showtime.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Showtimes;
*/


import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const showtimes = [
  { id: 1, time: "12:00 PM" },
  { id: 2, time: "03:00 PM" },
  { id: 3, time: "06:00 PM" },
];

const Showtimes = () => {
  const { id, title } = useParams();  // Fix: Correct parameter name
  console.log("Movie Title:", title);  // Fix: Ensure title is logged
  const navigate = useNavigate();

  const func = async (showtime) => {
    console.log("Clicked Showtime:", showtime.time);  // ✅ This prints
  
    const response = await fetch("http://localhost:5000/show", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id, show_time: showtime.time }),
    });
  
    const data = await response.json();
    console.log("API Response:", data);  // ✅ Check what is returned
  
    if (response.ok) {
      console.log("Response is OK");  // ✅ This should print
  
      if (data.message === 'Showtime added') {
        console.log("Navigating to:", `/seat/${id}/${title}/${showtime.time}`);  // ✅ Should print before navigate
        navigate(`/seat/${id}/${title}/${showtime.time}`);
      } else {
        console.error("Unexpected message:", data.message);  // ✅ Debug if message is different
        alert(data.message);
      }
    } else {
      console.error("Response error:", data.message);  // ✅ Debug failed request
    }
  };
  

  return (
    <div>
      <h2>Select Showtime for {title}</h2>  {/* Fix: Ensure title is displayed */}
      {showtimes.map((showtime) => (
        <div key={showtime.id} onClick={() => func(showtime)}>
          <p>{showtime.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Showtimes;
