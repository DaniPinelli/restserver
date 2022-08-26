const { response, json } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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
	
const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try{

        const {name, picture, email} = await googleVerify(id_token);

        let user = await User.findOne({email});

        if(!user){
            //Create user
            const data = {
                name,
                email,
                password: '123',
                picture,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //If user in DB
        if(!user.status){
            return res.status(401).json({
                message: 'Blocked user, please contact adm'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            id_token
        })
    } catch(error) {
        res.status(400).json({
            message: 'Token NOT verified'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}