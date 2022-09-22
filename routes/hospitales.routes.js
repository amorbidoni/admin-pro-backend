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
router.post('/', [validarJWT], addHiospital);

router.put('/:id', [], updateHospital);

router.delete('/:id', validarJWT, deleteHospital);

module.exports = router;
