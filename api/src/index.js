const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const {connectDb} = require("./helpers/db");
const {port, host, db, authApi} = require("./configuration");
const app = express();
const userSchema = new mongoose.Schema({
    name: String,
});
const User = mongoose.model("user", userSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host: ${host}`)
        console.log(`Our db is connected: ${db}`);
        const user = new User({name: "Admin"});
        console.log(user.name);
        user.save(function (err, userSave) {
            if (err) return console.error(err);
            console.log(userSave);
        });
    });
}

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly");
});

app.get("/api/data",(req,res) =>{
    res.json({
        api:true,
        string: "foo"
    });
});

app.get("/currentUser",(req, res) =>{
    console.log("authApi", authApi);
    axios.get(authApi + '/currentUser').then(response =>{
        res.json({
            user: true,
            userFromAuth: response.data
        });
    });

});

connectDb()
    .on(`error`, console.log)
    .on(`disconnected`, connectDb)
    .once('open', startServer);