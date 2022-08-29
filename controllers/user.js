const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');
const { countDocuments } = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 3, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Store in DB
    await user.save();

    res.json({
        user
    });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...other } = req.body;

    //Validate vs DB
    if (password) {

        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        other.password = bcryptjs.hashSync(password, salt);

        const user = await User.findByIdAndUpdate(id, other);

        res.json(user);
    }
}

const userPatch = (req, res) => res.json({ "msg": "patch API - controller" });


const userDelete = async (req, res = response) => {

    const {id} = req.params;

    //Delete user physically
    //const user = await User.findByIdAndDelete(id);

    //Delete user logically
    const user = await User.findByIdAndUpdate(id, { status: false });
    const authenticatedUser = req.user;
    
    res.json({user, authenticatedUser});

}


module.exports = {
    usersGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}