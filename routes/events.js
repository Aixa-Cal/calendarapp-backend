


const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidate} = require('../middlewares/fieldValidator')
const {validateJWT} = require('../middlewares/validate-jwt');
const {getEvents, createEvents, updateEvents, deleteEvents} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);


//Obtain event
router.get('/',
[ //middlewares

],
 getEvents);

//Create event
router.post('/',
[ //middlewares
check('title', 'Title is mandatory').not().isEmpty(),
check('start', 'Start date is mandatory').custom(isDate),
check('end', 'End date is mandatory').custom(isDate),

fieldValidate,
],
 createEvents);

//Update event
router.put('/:id',
[ //middlewares

],
 updateEvents);

//Delete event
router.delete('/:id',
[ //middlewares

],
 deleteEvents);

 module.exports = router;