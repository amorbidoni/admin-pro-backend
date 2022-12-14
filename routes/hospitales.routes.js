/*
    RUTA: /api/hospitales 
*/

const { Router } = require('express');
const { check } = require('express-validator');
//
const {
  getHospitales,
  updateHospital,
  deleteHospital,
  addHiospital,
} = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//

const router = Router();

router.get('/', getHospitales);
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validarCampos,
  ],
  addHiospital
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  updateHospital
);

router.delete('/:id', validarJWT, deleteHospital);

module.exports = router;
