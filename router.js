const express = require('express')
const { registerController, loginController, uploadUserProfileController } = require('./controller/userController')
const { addBookController, getHomeBooksController, getAllBooksController, getABookController, getStatusBookController, deleteUserAddedBookController, purchaseBookController } = require('./controller/bookController')
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require('./middlewares/imgMulterMiddleware')


const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/home-books', getHomeBooksController)

// ---------------------users-------------------------------------------------

// add book
router.post('/add-book', jwtMiddleware, multerConfig.array("uploadImages", 3), addBookController)

router.get('/all-books', jwtMiddleware, getAllBooksController)

router.get('/view-books/:id', jwtMiddleware, getABookController)

router.get('/userbooks', jwtMiddleware, getStatusBookController)

router.delete('/delete-book/:id', deleteUserAddedBookController)

router.get('/user-brought-book',jwtMiddleware,purchaseBookController)

router.put('/update-user-profile',jwtMiddleware, multerConfig.single("profile"), uploadUserProfileController)

module.exports = router