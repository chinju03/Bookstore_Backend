//9.import dotenv
require('dotenv').config() // loads .env file contents into process.env by default

// 1. import server
const express = require('express')

//5. import cors
const cors = require('cors')

//7.import router
const router = require('./router')

//11. import connection
require('./db/connection')


//2. create server
const bookstoreserver = express()

//6.tell server to use cors
bookstoreserver.use(cors())

//10. use json to parse 
bookstoreserver.use(express.json())

//8.tell server to use router
bookstoreserver.use(router)

//static files 
bookstoreserver.use("/imguploads",express.static("./imguploads"))

//3.create port
const PORT = process.env.PORT || 3000

//4. tell server to listen
bookstoreserver.listen(PORT,()=>{
    console.log(`book server started running successfully at port ${PORT},waiting for the client request`);
    
})

bookstoreserver.get('/',(req,res) => {
    res.status(200).send('bookstore server started ')
})


// bookstoreserver.post('/',(req,res)=>{
//     res.status(200).send('post request')
// })