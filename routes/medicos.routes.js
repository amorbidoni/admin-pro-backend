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
} = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//

const router = Router();

router.get('/', getMedicos);
router.post('/', [], addMedico);

router.put('/:id', [], updateMedico);

router.delete('/:id', deleteMedico);

module.exports = router;
