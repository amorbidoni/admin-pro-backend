/* 
    RUTA: api/uploads/

*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { uploadDocument } = require('../controllers/uploads.controller');

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, uploadDocument);

module.exports = router;
