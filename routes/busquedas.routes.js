/* 
    RUTA: api/todo/

*/
const { Router } = require('express');
const {
  searchData,
  searchColection,
} = require('../controllers/busquedas.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:data', validarJWT, searchData);
router.get('/coleccion/:tabla/:data', validarJWT, searchColection);

module.exports = router;
