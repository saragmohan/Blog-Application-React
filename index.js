const express = require('express');

const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const articleRoute = require('./routes/articles');

const path = require('path');
app.use(express.static('./build'));

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(error => console.log(error));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);

app.get('/*', function (req, res) {
    res.sendFile(path.join(_dirname + '/build/index.html'));
});


//Port number
app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port 5000");
});



