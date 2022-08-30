const { response } = require("express");
const path = require('path');



const uploadFile = (req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg: 'No files were uploaded.'});
      return;
    }
  
    file = req.files.file;
    const splitName = file.name.split('.');
    const extension = splitName[ splitName.length -1 ];

    console.log(splitName);
  
    // uploadPath = path.join( __dirname,  '../uploads/', file.name);
  
    // file.mv(uploadPath, (err) => {
    //   if (err) {
    //     return res.status(500).json({err});
    //   }
  
    //   res.json({msg: 'File uploaded to ' + uploadPath});
    // });
}



module.exports = {
    uploadFile
}