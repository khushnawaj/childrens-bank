const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const bankRoutes = require('./routes/accountRoutes')


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes); // Mount authentication routes
app.use('/api/bank', bankRoutes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));