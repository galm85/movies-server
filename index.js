const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const db = require('./config/db');
app.use(cors());
app.use(express.json({limit:"10mb"}));

//routes
const moviesRoute = require('./routes/moviesRoute');
const usersRoute = require('./routes/usersRoute');


app.use('/movies',moviesRoute);
app.use('/users',usersRoute);

app.get('/',(req,res)=>{
    res.send('root');
})




app.listen(PORT,()=>console.log('Server is running on port .....'+PORT));