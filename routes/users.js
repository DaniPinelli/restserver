const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdm, hasRole } = require('../middlewares');

const { isValidRole, emailExists, idUserExists } = require('../helpers/db-validators');

const { usersGet,
    userPost,
    userPut,
    userPatch,
    userDelete } = require('../controllers/user');


const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long and is required').isLength({ min: 6 }),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(emailExists),
    //check('role', 'Role not valid').isIn(['USER', 'ADM']),
    check('role').custom(isValidRole),
    validateFields
], userPost);

router.put('/:id', [
    check('id', 'Id not a valid ID').isMongoId(),
    check('id').custom(idUserExists),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.patch('/', userPatch);

router.delete('/:id', [
    validateJWT,
    //isAdm,
    hasRole('ADM','USER'),
    check('id', 'Id not a valid ID').isMongoId(),
    check('id').custom(idUserExists),
    validateFields
], userDelete);


module.exports = router;