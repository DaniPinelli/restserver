const { response } = require("express");
const { storeFile } = require("../helpers");

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



module.exports = {
    uploadFile
}