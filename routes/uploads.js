const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, updateFile, showImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validateFields,validateFile } = require('../middlewares');

const router = Router();


router.post('/', validateFile ,uploadFile );

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Must be a Mongo DB valid Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateFile);

router.get('/:collection/:id', [
    check('id', 'Must be a Mongo DB valid Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], showImage)




module.exports = router;