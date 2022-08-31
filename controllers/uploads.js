const { response } = require("express");
const { storeFile } = require("../helpers");

const { User, Product } = require('../models');

const uploadFile = async(req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg: 'No files were uploaded.'});
      return;
    }
  
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

    const name = await storeFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json({ model})

}


module.exports = {
    uploadFile,
    updateFile
}