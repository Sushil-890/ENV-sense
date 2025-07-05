const bodyParser=require('body-parser')
const cors = require('cors'); 
const express = require('express');
const app = express();
const approuter=require('./Routers/AuthRouter')
const weatherRoutes = require('./Routers/WeatherRouter');
app.use(express.json());
app.use(cors());

require('dotenv').config()
const PORT=process.env.PORT
require('./Models/dbconfig')



app.use(bodyParser.json());
app.use('/auth',approuter)

const vlogRouter = require('./Routers/vlogRouter.js');
app.use('/api/vlogs', vlogRouter);


app.use('/api/weather', weatherRoutes);

app.get('/',(req,res)=>{
    res.send("server connected")
})
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
})
