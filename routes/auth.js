
/*
Rutas de usuarios
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator')
const{fieldValidate} = require('../middlewares/fieldValidator')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();


router.post(
    '/new',
    [ //middlewares
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password needs at least 6 characters ').isLength({min: 6}),
        fieldValidate
    ],
    createUser);

router.post(
    '/', //middlewares
   [ check('email', 'Email is mandatory').isEmail(),
   check('password', 'Password needs at least 6 characters ').isLength({min: 6}),
   fieldValidate
   ],
     loginUser);

router.get(
    '/renew',
    validateJWT,
    revalidateToken);

module.exports = router;