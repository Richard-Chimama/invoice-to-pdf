const express = require('express');
const router = require('./routes/index');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({
    type:'application/json'
}));
app.use(router);
app.listen(3000, () => {
    console.log('server running on port 3000');
});