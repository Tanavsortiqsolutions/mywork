const router = require("express").Router(); 
const register = require('../../controller/Auth/register')




router.post("/register",register)