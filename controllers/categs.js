const { response } = require("express");
const {Categ} = require("../models");

const getCategs = async(req, res = response) => {

    const { limit = 3, from = 0 } = req.query;
    const query = { status: true };

    const [total, categs] = await Promise.all([
        Categ.countDocuments(query),
        Categ.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categs
    });
}

const getCategById = async (req, res = response) => {
    const {id} = req.params; 
    const categ = await Categ.findById(id)
    .populate('user', 'name');
    res.json(categ);
}

const createCateg = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categDB = await Categ.findOne({name})

    if(categDB) {
        return res.status(400).json({
            msg: 'Category already exists'
        });
    }

   //Generate data to store 
   const data = {
        name, 
        user: req.user._id
   }

   const categ = new Categ(data);

   // Store in DB
   await categ.save();

   res.status(201).json(categ);
}

const updateCateg = async (req, res = response) =>{

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.nombre = data.name.toUpperCase();
    data.user = req.user._id;

    const categ = await Categ.findByIdAndUpdate(id, data, {new:true});

    res.json(categ);
}


module.exports = {
    createCateg,
    getCategs,
    getCategById,
    updateCateg
}