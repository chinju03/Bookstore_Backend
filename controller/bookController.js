const books = require("../model/bookModel");
const { findById, findByIdAndDelete } = require("../model/userModel");
const { all } = require("../router");

exports.addBookController = async (req, res) => {
    console.log("inside add book controller");

    const { title, author, noOfPages, price, dPrice, abstract, publisher, language, isbn, category, imageUrl } = req.body
    console.log(title, author, noOfPages, price, dPrice, abstract, publisher, language, isbn, category);

    //    console.log(req.files);

    var uploadImages = []
    req.files.map((item) => uploadImages.push(item.filename))
    console.log(uploadImages);
    const userMail = req.payload
    console.log(userMail);

    console.log(title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages, userMail);

    try {
        const existingBook = await books.findOne({ title, userMail })
        if (existingBook) {
            res.status(401).json('You have already added this book')
        } else {
            const newBook = new books({
                title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages, userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

//get home books 
exports.getHomeBooksController = async (req, res) => {
    console.log("inside get home book controller");

    try {
        const homeBooks = await books.find().sort({ _id: -1 }).limit(4)
        res.status(200).json(homeBooks)

    } catch (error) {
        res.status(500).json(error)
    }
}

//get all books
exports.getAllBooksController = async (req, res) => {
    console.log('inside all books controller');
    const searchKey = req.query.search
    const userMail = req.payload

    const query = {
        title: { $regex: searchKey, $options: "i" },
        userMail: { $ne: userMail }

    }
    try {
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)

    } catch (error) {
        res.status(500).json(error)
    }

}

//get a book
exports.getABookController = async (req, res) => {
    console.log('inside a book controller');
    const { id } = req.params

    try {
        const aBook = await books.findById({ _id: id })
        res.status(200).json(aBook)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getStatusBookController = async (req, res) => {
    console.log('inside status book controller');
    const userMail = req.payload

    try {
        const statusBook = await books.find({ userMail })
        res.status(200).json(statusBook)

    } catch (error) {
        res.status(500).json(error)

    }
}

//delete

exports.deleteUserAddedBookController = async (req, res) => {
    console.log('inside delete book controller');
    const { id } = req.params
    try {
        await books.findByIdAndDelete({ _id: id })
        res.status(200).json("Book Deleted Succesfully")
    } catch (error) {
        res.status(500).json(error)

    }

}

exports.purchaseBookController = async (req, res) => {
    console.log('inside purchase book controller');
    const email = req.payload
    try {
        const purchaseBook = await books.find({ boughtBy: email })
        res.status(200).json(purchaseBook)
    } catch (error) {
        res.status(500).json(error)

    }
}
