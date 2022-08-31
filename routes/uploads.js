const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateFile } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/', uploadFile );

router.put('/:collection/:id', [
    check('id', 'Must be a Mongo DB valid Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateFile);




module.exports = router;