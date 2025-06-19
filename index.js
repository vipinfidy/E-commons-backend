const express = require('express');
const mongoose = require('mongoose');
const cros = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cros());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MODE === 'docker'
  ? 'mongodb://mongo:27017/ecomdb'  // Docker MongoDB
  : process.env.MONGO_URI_LOCAL;    // Local MongoDB (e.g., localhost)
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


    const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);


// Sample Route
app.get('/', (req, res) => {
    res.send('🚀 E-commerce Backend Running');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});