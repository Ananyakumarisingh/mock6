const express = require('express');
const connectMongo = require('./config/db');
const routes = require("./routes/route");
require('dotenv').config;

const PORT = process.env.PORT;
const app = express();
app.use( express.json() );

app.use('/api', routes);

app.listen(PORT, async() => {
    try {
        await connectMongo();
        console.log(`Running at PORT: ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});