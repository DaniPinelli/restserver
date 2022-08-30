const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct
} = require('../controllers/products');

const { ifCateg, ifProduct } = require('../helpers/db-validators');

const { validateJWT, validateFields, isAdm } = require('../middlewares');

const router = Router();

//{{url}}/api/products

// Get all products - public
router.get('/', getProducts);

// Get product by id - public
router.get('/:id',[
    check('id', 'Id NOT valid').isMongoId(),
    check('id').custom(ifProduct),
    validateFields
], getProductById);

//Create product - private - any person w/token
router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('categ', 'Id NOT valid').not().isEmpty(),
    check('categ').custom(ifCateg),
    validateFields
], createProduct);

//Update - private - any person w/token
router.put('/:id', [
    validateJWT,
    //check('name', 'Name is required').not().isEmpty(),
    //check('id').custom(ifCateg),
    validateFields
], updateProduct);

//Delete - Admin
router.delete('/:id', [
    validateJWT,
    isAdm,
    check('id', 'Id NOT valid').isMongoId(),
    check('id').custom(ifProduct),
    validateFields
], deleteProduct);

module.exports = router;