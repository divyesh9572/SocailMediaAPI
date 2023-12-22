const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myapp')
.then(()=>{
    console.log("connected database successfull");
}).catch((error)=>{
    console.log("error",error);
});

const db = mongoose.connection;
module.exports = db;

