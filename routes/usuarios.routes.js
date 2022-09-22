/*
    BaseURL : '/api/usuarios'
*/
const { Router } = require('express');
const { check } = require('express-validator');
//
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//

const router = Router();

router.get('/', validarJWT, getUsers);
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
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  updateUser
);

router.delete('/:id', validarJWT, deleteUser);

module.exports = router;
