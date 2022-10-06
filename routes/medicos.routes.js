/*
    RUTA: /api/medicos 
*/

const { Router } = require('express');
const { check } = require('express-validator');
//
const {
  getMedicos,
  updateMedico,
  addMedico,
  deleteMedico,
  getMedicosById,
} = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//

const router = Router();

router.get('/', validarJWT, getMedicos);

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El hospital es requerido').not().isEmpty(),
    check('hospital', 'El hospital Id debe ser válido').isMongoId(),
    validarCampos,
  ],
  addMedico
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El hospital es requerido').not().isEmpty(),
    check('hospital', 'El hospital Id debe ser válido').isMongoId(),
    validarCampos,
  ],
  updateMedico
);

router.delete('/:id', validarJWT, deleteMedico);

router.get('/:id',validarJWT, getMedicosById);

module.exports = router;
