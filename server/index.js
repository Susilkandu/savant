const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/model')
require('./models/post')
const PORT= process.env.PORT||3000;
const app= express();
app.use(express.json())
app.use(cors());
require('dotenv').config();
// database connection
const url="mongodb://127.0.0.1:27017/savant";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true}).then(() => {
  console.log('Connected to MongoDB successfully!');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});
// route
app.use(require("./routes/auth"))
app.use(require('./routes/userRoutes'))
// server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})