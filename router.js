const express = require('express')
const { registerController, loginController } = require('./controller/userController')
const { addBookController, getHomeBooksController, getAllBooksController } = require('./controller/bookController')
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require('./middlewares/imgMulterMiddleware')


const router = express.Router()

router.post('/register',registerController)

router.post('/login', loginController)

router.get('/home-books', getHomeBooksController)

// ---------------------users-------------------------------------------------

// add book
router.post('/add-book', jwtMiddleware, multerConfig.array("uploadImages",3), addBookController )

router.get('/all-books', jwtMiddleware, getAllBooksController)

module.exports = router