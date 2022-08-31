const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storeFile = ({ file }, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) => {

        const splitName = file.name.split('.');
        const extension = splitName[ splitName.length -1 ];

        //Validate extension
        if(!validExtension.includes(extension)){
            reject(`Extension NOT valid, must be ${validExtension}`)
        } else {
        const changedName = uuidv4() + '.' + extension;
        uploadPath = path.join( __dirname,  '../uploads/', folder, changedName);
    
        file.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        }
    
        resolve(changedName);
        });
        }
    
        
    });
}



module.exports = {
    storeFile
}