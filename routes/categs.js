const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createCateg, 
    getCategs, 
    getCategById, 
    updateCateg, 
    deleteCateg
} = require('../controllers/categs');
const { ifCateg } = require('../helpers/db-validators');

const { validateJWT, validateFields, isAdm } = require('../middlewares');

const router = Router();

//{{url}}/api/categs

// Get all categories - public
router.get('/', getCategs);

// Get category by id - public
router.get('/:id',[
    check('id', 'Id NOT valid').isMongoId(),
    check('id').custom(ifCateg),
    validateFields
], getCategById);

//Create category - private - any person w/token
router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCateg);

//Update - private - any person w/token
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(ifCateg),
    validateFields
], updateCateg);

//Delete - Admin
router.delete('/:id', [
    validateJWT,
    isAdm,
    check('id', 'Id NOT valid').isMongoId(),
    check('id').custom(ifCateg),
    validateFields
], deleteCateg);

module.exports = router;