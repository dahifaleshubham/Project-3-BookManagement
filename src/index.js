const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const multer = require('multer')
const  mongoose = require('mongoose');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

mongoose.connect("mongodb+srv://debojit:rJuLc4nyipWKU6tV@cluster1.31noc.mongodb.net/group19Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);

app.use(bodyParser.json());
app.use(multer().any());

app.all('*', function (req, res) {
    throw new Error("Bad Request");
})
app.use(function (e, req, res, next) {
    if (e.message == "Bad Request") return res.status(400).send({ error: e.message });
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
