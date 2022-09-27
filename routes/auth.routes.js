/*

PETICIÓN AL URL: /api/auth

*/
const { Router } = require('express');
const { check } = require('express-validator');
const {
  login,
  googleSignIn,
  renewToken,
} = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email ingresado es incorrecto.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  '/google',
  [
    check('token', 'El token de Google es obligatorio.').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);
router.get('/renew', [validarJWT], renewToken);

module.exports = router;
