const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            message: 'No token received'
        });
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETKEY);

        //Read uid's user
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                message: 'User NOT found in DB'
            });
        }
          
        //Validate user's status true
        if (!user.status){
            return res.status(401).json({
                message: 'User NOT valid'
            });
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            message:'Token NOT valid'
        });
    }    
}



module.exports = {
    validateJWT
}