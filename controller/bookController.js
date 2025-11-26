const books = require("../model/bookModel");
const { all } = require("../router");

exports.addBookController = async(req,res)=>{
   console.log("inside add book controller");

   const {title,author,noOfPages,price,dPrice,abstract,publisher,language,isbn,category,imageUrl } = req.body 
   console.log(title,author,noOfPages,price,dPrice,abstract,publisher,language,isbn,category);
   
//    console.log(req.files);

   var uploadImages = []
   req.files.map((item )=> uploadImages.push(item.filename))
   console.log(uploadImages);
   const userMail = req.payload
   console.log(userMail);

   console.log(title,author,noOfPages,imageUrl,price,dPrice,abstract,publisher,language,isbn,category,uploadImages,userMail);

   try {
    const existingBook = await books.findOne({title,userMail})
    if(existingBook){
        res.status(401).json('You have already added this book')
    }else{
        const newBook = new books({
            title,author,noOfPages,imageUrl,price,dPrice,abstract,publisher,language,isbn,category,uploadImages,userMail
        })
        await newBook.save()
        res.status(200).json(newBook)
    }
    
   } catch (error) {
    res.status(500).json(error)
    
   }    
}

//get home books 
exports.getHomeBooksController = async(req,res)=>{
    console.log("inside get home book controller");
    
    try {
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
        
    } catch (error) {
        res.status(500).json(error)  
    }
}

//get all books
exports.getAllBooksController = async(req,res)=>{
    console.log('inside all books controller');
    try {
        const allBooks = await books.find()
        res.status(200).json(allBooks)
        
    } catch (error) {
        res.status(500).json(error)     
    }
    
}