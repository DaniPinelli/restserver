const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");


const login = async(req, res = response) => {

    const {email, password} = req.body;
    
    try {
        //Check if email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: 'Wrong user or password'  
            });
        }

        //Check user active
        if(!user.status) {
            return res.status(400).json({
                message: 'Status false'  
            });
        }

        //Verify password
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({
                message: 'Wrong password'  
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong, please talk to the administrator'
        })
    }
}
	


module.exports = {
    login
}