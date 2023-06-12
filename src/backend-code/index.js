const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const carSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  specifications: [String],
});

const Car = mongoose.model('Car', carSchema);


app.use(bodyParser.json());

// Signup API endpoint
app.post('/api/signup', (req, res) => {
  // Extract data from request body
  const { name, email, mobile, password } = req.body;

  // Create a new User document
  const newUser = new User({ name, email, mobile, password });

  // Save the user to MongoDB
  newUser.save((err, savedUser) => {
    if (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Error saving user' });
    } else {
      console.log('User saved:', savedUser);
      res.json(savedUser);
    }
  });
});

// Login API endpoint
app.post('/api/login', (req, res) => {

  const { email, password } = req.body;


  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Error finding user' });
    } else if (!user) {
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
    } else {
      console.log('User found:', user);
      res.json(user);
    }
  });
});

app.post('/api/cars', (req, res) => {
  
  const { image, title, description, specifications } = req.body;


  const newCar = new Car({ image, title, description, specifications });

  
  newCar.save((err, savedCar) => {
    if (err) {
      console.error('Car details saving error:', err);
      res.status(500).json({ error: 'Error saving car details' });
    } else {
      console.log('Car details saved:', savedCar);
      res.json(savedCar);
    }
  });
});


app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Get Car Listings error:', error);
    res.status(500).json({ error: 'Error getting car listings' });
  }
});

// Delete a car listing
app.delete('/api/cars/:carId', async (req, res) => {
  const carId = req.params.carId;

  try {
    await Car.findByIdAndDelete(carId);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete Car error:', error);
    res.status(500).json({ error: 'Error deleting car' });
  }
});

// Edit a car listing
app.put('/api/cars/:carId', async (req, res) => {
  const carId = req.params.carId;
  const { image, title, description, specifications } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { image, title, description, specifications },
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    console.error('Edit Car error:', error);
    res.status(500).json({ error: 'Error editing car' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
