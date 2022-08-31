const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { storeFile } = require("../helpers");

const { User, Product } = require('../models');

const uploadFile = async(req, res = response) => {
  
    //Images and a
    const filePath = await storeFile(req.files, undefined, 'images');

    // Add txt and md
    //const filePath = await storeFile(req.files, ['txt', 'md'], 'texts');

    res.json({
      filePath
    })
}

const updateFile = async(req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
      case 'users':
        model = await User.findById(id);
        if(!model){
           return res.status(400).json({
            msg: 'There is no user with the received id'
           })
        }

        break;

        case 'products':
        model = await Product.findById(id);
        if(!model){
           return res.status(400).json({
            msg: 'There is no product with the received id'
           })
        }

        break;
    
      default:
        return res.status(500).json({msg: 'This needs to be validated'})
    }


    //Clean preview images
    if (model.img){
        //Delete image from server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img );
        if(fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }


    const name = await storeFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json({ model});

}

const showImage = async (req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
         return res.status(400).json({
          msg: 'There is no user with the received id'
         })
      }

      break;

      case 'products':
      model = await Product.findById(id);
      if(!model){
         return res.status(400).json({
          msg: 'There is no product with the received id'
         })
      }

      break;
  
    default:
      return res.status(500).json({msg: 'This needs to be validated'})
  }


  //Clean preview images
  if (model.img){
      //Delete image from server
      const pathImage = path.join(__dirname, '../uploads', collection, model.img );
      if(fs.existsSync(pathImage)) {
         return res.sendFile(pathImage)
      }
  }

  const pathNoImage = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(pathNoImage);

}


module.exports = {
    uploadFile,
    updateFile,
    showImage
}