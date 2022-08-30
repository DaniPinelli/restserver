const { User, Categ, Product } = require('../models');
const Role = require('../models/role');

const isValidRole = async (role = '') => {
    const ifRole = await Role.findOne({ role });
    if (!ifRole) {
        throw new Error(`The role ${role} is not allowed in the db, it must be "USER", "ADM" or "SALES".`)
    }
}

const emailExists = async (email = '') => {

    //Check if the email exists
    const ifEmail = await User.findOne({ email });
    if (ifEmail) {
        throw new Error('Email already exists');
    }
}

const idUserExists = async (id) => {

    //Check if the email exists
    const ifId = await User.findById(id);
    if (!ifId) {
        throw new Error('Id not valid');
    }
}

const ifCateg = async (id) => {

    //Check if the email exists
    const ifCateg = await Categ.findById(id);
    if (!ifCateg) {
        throw new Error('Id not valid');
    }
}

const ifProduct = async (id) => {

    //Check if the email exists
    const ifProduct = await Product.findById(id);
    if (!ifProduct) {
        throw new Error('Id not valid');
    }
}

module.exports = {
    isValidRole,
    emailExists,
    idUserExists,
    ifCateg,
    ifProduct
}