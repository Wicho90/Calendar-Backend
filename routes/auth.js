const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { createUser, loginUser, revalidarToken } = require('../controllers/auth');

const router = Router();


router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],    
    loginUser
);
 
router.post('/new',
    [ // Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ],
    createUser
);

router.get('/renew',
    [
        validarJWT
    ],    
    revalidarToken
);




module.exports = router;