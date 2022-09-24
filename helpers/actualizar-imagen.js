const fs = require('fs');
const Usuario = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = (tipo, imgUrl) => {
  const pathViejo = `./uploads/${tipo}/${imgUrl}`;
  //   si se ebncuentra medico tengo que borrar la imagen anterior ↓
  if (fs.existsSync(pathViejo)) {
    // borrar la imagen anterior↓
    fs.unlinkSync(pathViejo);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log('No se encontro medico con ese id');
        return false;
      }
      //
      borrarImagen(tipo, medico.img);
      //
      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('No se encontro hospital con ese id');
        return false;
      }
      //
      borrarImagen(tipo, hospital.img);
      //
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('No se encontro usuario con ese id');
        return false;
      }
      //
      borrarImagen(tipo, usuario.img);
      //
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
