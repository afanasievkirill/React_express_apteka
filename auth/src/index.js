const express = require("express");
const {connectDb} = require("./helpers/db");
const axios = require('axios');
const {port, host, db, apiUrl} = require("./configuration");
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host: ${host}`)
        console.log(`Our db is connected: ${db}`);

    });
}

app.get("/test", (req, res) => {
    res.send("Our auth server is working correctly");
});

app.get("/api/data", (req, res) => {
    axios.get(apiUrl+ "/data").then(response => {
        res.json({
            data:response.data.api,
            string:response.data.string
        });
    });
});

app.get("/api/currentUser",(req, res) =>{
    res.json({
        id:"1",
        email:"first"
    });
});

connectDb()
    .on(`error`, console.log)
    .on(`disconnected`, connectDb)
    .once('open', startServer);