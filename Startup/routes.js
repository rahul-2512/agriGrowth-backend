const express=require("express");
const cors=require("cors");
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
const auth=require("../Routes/auth");
const soiltest=require("../Routes/soiltest");

module.exports=function(app){
    app.use(cors());
    app.use(express.json());
    app.use(upload.any()); 
    app.use("/api/auth",auth);
    app.use("/api/soiltest",soiltest);
}

