const express = require('express');
const HomeRouter = express.Router();
const multer = require('multer');
const path = require('path');
let userAuthenticate=require('../Middleware/Middleware')
let jwt=require('jsonwebtoken')

const HomePageProduct=require('../Models/homeProductSchema')
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


HomeRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const {title,description }=req.body
    const { path } = req.file;
    const HomePageData = new HomePageProduct({title, description, imagePath: path });
    await HomePageData.save();
    res.json({ message: 'Products uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Product upload failed.' });
  }
});

HomeRouter.get('/upload', async (req, res) => {
    try {
      const images = await HomePageProduct.find();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching images.' });
    }
  })

module.exports = HomeRouter;