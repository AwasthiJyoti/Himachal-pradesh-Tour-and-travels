//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/himachal_tour', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for Tour packages
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

// Define a schema for Inquiries
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

// Create models
const Tour = mongoose.model('Tour', tourSchema);
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// API Endpoints

// Get all tour packages
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit an inquiry
app.post('/api/inquiries', async (req, res) => {
  const inquiry = new Inquiry({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const savedInquiry = await inquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
