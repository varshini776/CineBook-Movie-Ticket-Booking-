const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; // You can choose any port you like
const { MongoClient,ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json()); // To parse JSON bodies

const uri = 'mongodb://localhost:27017/'; // MongoDB connection URI

app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let client;
  try {
    //client = new MongoClient(uri, { useUnifiedTopology: true });
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('signups');

    // Check if the email already exists
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ message: 'Already have an account' });
    }
    else{
    // Insert the new user
    newuser=await collection.insertOne({ name, email, phone, password });
    res.status(200).json({ message: 'Signup successful!', _id:newuser.insertedId})}
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.post('/login',async(req,res)=>{
try{
  client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('signups');

    user=await collection.findOne({email:req.body.email})
    if(user)
    {
      if(user.password===req.body.password)
        res.status(200).json({message: 'Login sucessfull', id: user._id});
      else
        res.status(200).json({message:'Wrong password'})
    }
    else
    res.status(200).json({message:'No account'})
}
catch (error) {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal Server Error' });
} finally {
  if (client) {
    await client.close();
  }
}
})

app.put('/forgot',async(req,res)=>{
  const { email, newpassword } = req.body;
  try{
    client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db('signup');
      const collection = db.collection('signups');
  
      user=await collection.findOne({email:req.body.email})
      if(user)
      {
        await collection.updateOne({email},{$set:{password:newpassword}})
        res.status(200).json({message:'account exit'})
        
      }
      else
      {res.status(200).json({message:'No account'})}
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
  })

app.post('/home',async(req,res)=>{
  console.log(req.body);
  const {user_id,movie_title}=req.body
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('my_movies');
    
    await collection.insertOne({user_id,movie_title})
    res.status(200).json({message:'Inserted'})
    
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
})  

app.put('/show',async(req,res)=>{
  const {user_id,show_time}=req.body
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('my_movies');
    
    user=await collection.findOne({user_id:user_id})
    if(user)
    {
      await collection.updateOne({user_id},{$set:{show_time:show_time}})
      res.status(200).json({message:'Showtime added'})
    }
    else
    {res.status(200).json({message:'no account'})}
    } 
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
})
/*

app.put('/seat',async(req,res)=>{
  const {user_id,seat}=req.body
  try{
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('my_movies');
    user=await collection.findOne({user_id:user_id})
    if(user)
    {
      await collection.updateOne({user_id},{$set:{seat:seat}})
      res.status(200).json({message:' seat add'})
    }
    else
    {res.status(200).json({message:'no account'})}
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
})
*/  
app.post("/booked-seats", async (req, res) => {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('my_movies');

    console.log("Request body:", req.body); // ✅ Log the incoming data

    if (!req.body.movie_title || !req.body.show_time) {
      return res.status(400).json({ message: "Missing movie_title or show_time" });
    }

    // Use find() to get all matching bookings
    const bookings = await collection.find({
      movie_title: req.body.movie_title,
      show_time: req.body.show_time,
    }).toArray();

    if (!bookings.length) {
      console.log("No booking found for:", req.body.movie_title, req.body.show_time);
      return res.json({ seats: [] }); // Return empty array if no booking found
    }

    // Extract and merge seats from all bookings
    const allBookedSeats = bookings.flatMap(booking => booking.seat || []);

    console.log("Booked seats found:", allBookedSeats);
    res.json({ seats: allBookedSeats });

  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});





// **Route: Save Seat Selection**
app.put('/seat', async (req, res) => {
  const { user_id, seat, movie_title, show_time } = req.body;
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const collection = db.collection('my_movies');
    await collection.updateOne(
      { user_id, movie_title, show_time },
      { $set: { seat } },
      { upsert: true }
    );
    res.status(200).json({ message: 'Seats booked successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/booking-summary/:id', async (req, res) => {
  const { id } = req.params;
  let client;
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const movieCollection = db.collection('my_movies');
    const user = await movieCollection.findOne({ user_id: id });

    if (user) {
      res.status(200).json({
        movie: { title: user.movie_title },
        showtime: { time: user.show_time },
        seats: user.seat,
      });
    } else {
      res.status(404).json({ message: 'Booking data not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get('/admin/:title', async (req, res) => {
  const { title } = req.params;
  let client;
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('signup');
    const moviesCollection = db.collection('my_movies');
    const signupsCollection = db.collection('signups');

    const bookings = await moviesCollection.find({ movie_title: title }).toArray();
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this movie' });
    }

    const userDetails = await Promise.all(
      bookings.map(async (booking) => {
        const user = await signupsCollection.findOne({ _id: new ObjectId(booking.user_id) });
        console.log("Fetched user:", user);
        return {
          name: user ? user.name : "Unknown User",
          seats: booking.seat || [],
        };
      })
    );

    res.status(200).json({ title, users: userDetails });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
