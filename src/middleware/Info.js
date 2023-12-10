
// UserSchema
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 name: String,
 email: String,
 profile: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Profile'
 }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

// ProfileSchema
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
 bio: String,
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;


// Create User Endpoint
app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({success:true, data: user });
    } catch (err) {
      res.status(400).json({success: false, message:err.message});
    }
   });


   // Create Profile endPoint
   app.post('/profiles', async (req, res) => {
    try {
      const profile = new Profile(req.body);
      await profile.save();
      res.status(201).json({success:true, data: profile });
    } catch (err) {
      res.status(400).json({success: false, message:err.message});
    }
   });

   // Get User endPoint
   app.get('/users', async (req, res) => {
    try {
     const users = await User.find({}).populate('profile');
     res.status(200).json({success: true, data: users });
    } catch (err) {
     res.status(400).json({success: false, message:err.message});
    }
   });

   // Get User by M.D
   app.get('/users/:id', async (req, res) => {
    try {
     const user = await User.findById(req.params.id).populate('profile');
     if (!user) {
       return res.status(404).json({success: false, message: 'User not found'});
     }
     res.status(200).json({success: true, data: user });
    } catch (err) {
     res.status(400).json({success: false, message:err.message});
    }
   });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const port = 3000;

// MongoDB connection
mongoose.connect('<your_database_url>', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Models
const profileSchema = new mongoose.Schema({
  companyName: String,
  address: String,
  phoneNo: String,
  plan: String,
  logo: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    unique: true,
  },
  createdOn: { type: Date, default: Date.now },
});


// Middleware
app.use(bodyParser.json());

// Endpoint to create a new profile
app.post('/api/profiles', async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = new Profile(profileData);
    const savedProfile = await newProfile.save();
    res.status(201).json({ success: true, data: savedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password, profileId } = req.body;

    // Create a new user and associate it with the specified profile
    const newUser = new User({
      username,
      email,
      password,
      profile: profileId,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to get all users with their profiles
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).populate('profile');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
