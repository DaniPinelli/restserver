const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const { apikey } = req.query;

    res.json({
        msg: "get API - controller",
        apikey
    });
}

const userPost = (req, res = response) => {

    const { name, age } = req.body;

    res.status(201).json({
        msg: "post API - controller",
        name,
        age
    });
}

const userPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: "put API - controller",
        id
    });
}

const userPatch = (req, res) => res.json({ "msg": "patch API - controller" });

const userDelete = (req, res) => res.json({ "msg": "delete API - controller" });
module.exports = {
    usersGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}