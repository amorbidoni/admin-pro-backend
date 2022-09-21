/*
    BaseURL : '/api/usuarios'
*/
const { Router } = require('express');
const { check } = require('express-validator');
//
const { getUsers, createUser, updateUser } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
//

const router = Router();

router.get('/', getUsers);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    // el custom middleware lo ponemos al final despues de todas las validaciones↓
    validarCampos,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
  ],
  updateUser
);
module.exports = router;
