const express = require('express');
const MensFashionRouter = express.Router();
const multer = require('multer');
const path = require('path');

const mensProduct=require('../Models/mensFashionSchema');
const MensProduct = require('../Models/mensFashionSchema');
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


MensFashionRouter.post('/mens-upload', upload.single('image'), async (req, res) => {
  try {
    const {title,description,price,offer,size}=req.body
    const { path } = req.file;
    const MensData = new mensProduct({title, description,price,offer,size,imagePath: path });
    await MensData.save();
    res.json({ message: 'Products uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Product upload failed.' });
  }
});

MensFashionRouter.get('/mens-upload', async (req, res) => {
    try {
      const images = await mensProduct.find();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching images.' });
    }
  })

  MensFashionRouter.delete('/mens-upload/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      MensProduct.findOneAndDelete({ _id: postId})
      .then((deletedRecord) => {
           if (deletedRecord) {
             res.status(200).json({ message: "Post deleted successfully" });
           } else {
             res.status(404).json({ message: "Post not found" });
           }
         })
         .catch((err) => {
           res.status(500).json({ message: "Failed to delete post" });
         })
    
    } catch (error) {
      res.status(500).json({ error: 'Error deleting data.' });
    }
  })

  MensFashionRouter.put('/mens-upload/:postId', upload.single('image'), async (req, res) => {
    try {
      const postId = req.params.postId;
      
      // Check if req.file is defined
      const imagePath = req.file ? req.file.path : null;
  
      MensProduct.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            imagePath: imagePath, // Set imagePath to null if req.file is undefined
            price: req.body.price,
            offer: req.body.offer,
            size: req.body.size,
          },
        },
        { new: true }
      )
      .then((updatedRecord) => {
        if (updatedRecord) {
          res.status(200).json({ message: "Post updated successfully", data: updatedRecord });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch((err) => {
        console.error("Error updating record:", err);
        res.status(500).json({ message: "Failed to update post" });
      });
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ error: 'Error editing data.' });
    }
  });
  
  MensFashionRouter.get('/search', async (req, res) => {
    const query = req.query.query;
  
    try {
      const searchResults = await mensProduct.find({
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
        ],
      });
  
      res.json(searchResults);
    } catch (error) {
      console.error('Error searching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = MensFashionRouter;