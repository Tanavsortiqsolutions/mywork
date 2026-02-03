const mongoose = require(`mongoose`);
const express = require ('express');
const routes = require(``);
const bend = express();
 const http = require('http').Server(bend)
 const cors = require(`cors`);

bend.use(express.json())

bend.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","DELETE","UPDATE","HEAD","PUT","PATCH"],
}))

bend.use("api", routes)


then(()=>{
    const PORT=5003
    http.listen(PORT,()=>{
         console.log(`Server is running on port ${PORT}`);
    })
})