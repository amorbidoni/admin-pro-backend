const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const uploadDocument = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];

  if (!tiposPermitidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msj: 'El tipo seleccionado no es valido (hospitales/medicos/usuarios)',
    });
  }
  //   validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ ok: false, msj: 'No hay ningun archivo' });
  }
  // procesar la imagen

  const file = req.files.imagen;

  const nombreCortado = file.name.split('.'); //ej: nombre.imagen.jpg
  const extencion = nombreCortado[nombreCortado.length - 1];

  //   validar extencion

  const extencionesValidas = ['png', 'jpg', 'jpeg', 'gift', 'webp'];

  if (!extencionesValidas.includes(extencion)) {
    return res.status(400).json({
      ok: false,
      msj: 'No es una extencion permitida: png, jpg, jpeg, gift, webp',
    });
  }

  // crear un nombre de archivo unico para que no se repita

  const nombreArchivo = `${uuidv4()}.${extencion}`;

  //   path para guardar la imagen

  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msj: 'Error al mover el archivo sampleFile',
      });
    }

    //Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msj: 'Archivo subido',
      nombreArchivo,
    });
  });
};
const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const image = req.params.image;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${image}`);
  // imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};
module.exports = {
  uploadDocument,
  retornaImagen,
};
