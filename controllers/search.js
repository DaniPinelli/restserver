const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Categ, Product } = require("../models");

const collectionsAllowed = [
    'users',
    'categ',
    'products',
    'roles'
];

const searchUsers = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId){
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user]: []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({ 
       $or: [{name: regex, status: true }, {email: regex} ],
       $and: [{status:true}] 
    });

    res.json({
        results: users
    });

}

const searchCategs = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId){
        const categ = await Categ.findById(term);
        return res.json({
            results: (categ) ? [categ]: []
        });
    }

    const regex = new RegExp(term, 'i');

    const categs = await Categ.find({name: regex, status: true });

    res.json({
        results: categs
    });

}

const searchProducts = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId){
        const product = await Product.findById(term).populate('categ', 'name');
        return res.json({
            results: (product) ? [product]: []
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({name: regex, status: true }).populate('categ', 'name');

    res.json({
        results: products
    });

}


const search = (req, res = response) => {

    const { collection, term } = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg: `The allowed collections are: ${ collectionsAllowed }`
        })
    }

    switch(collection){
      case 'users':
        searchUsers(term, res);
      break;

      case 'categ':
        searchCategs(term, res);
      break;

      case 'products':
        searchProducts(term, res);
      break;

      default:
        res.status(500).json({
            msg: 'Search NOT created'
        })
    }
}

module.exports = { 
    search
}