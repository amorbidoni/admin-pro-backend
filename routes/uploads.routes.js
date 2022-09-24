/* 
    RUTA: api/uploads/

*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const {
  uploadDocument,
  retornaImagen,
} = require('../controllers/uploads.controller');

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, uploadDocument);
router.get('/:tipo/:image', validarJWT, retornaImagen);

module.exports = router;
