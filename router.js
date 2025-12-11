const express = require('express')
const { registerController, loginController, uploadUserProfileController, getAllUsersAdminController, uploadAdminProfileController, googleloginController } = require('./controller/userController')
const { addBookController, getHomeBooksController, getAllBooksController, getABookController, getStatusBookController, deleteUserAddedBookController, purchaseBookController, getAllBooksAdminController, updateBookStatusAdminController, makeBookPaymentController} = require('./controller/bookController')
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require('./middlewares/imgMulterMiddleware')
const adminjwtMiddleware = require('./middlewares/adminjwtMiddleware')


const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/google-login', googleloginController)

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

router.put('/make-payment', jwtMiddleware, makeBookPaymentController)


//------------admin-----------

router.get('/admin-allbooks',getAllBooksAdminController)

router.put('/update-book/:id', updateBookStatusAdminController)

router.get('/admin-allusers',adminjwtMiddleware,getAllUsersAdminController)

router.put('/update-admin-profile',adminjwtMiddleware, multerConfig.single("profile"), uploadAdminProfileController)



module.exports = router