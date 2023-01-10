const { Router } = require('express');
const { check } = require('express-validator');

const { findAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();
router.use( validarJWT );

// Rutas
router.get('/', findAllEvents);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent
);

router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent
);


router.delete('/:id', deleteEvent)


module.exports = router;

