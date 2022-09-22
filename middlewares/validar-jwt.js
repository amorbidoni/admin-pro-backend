const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  // leer el token

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msj: `No hay token en la petición`,
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msj: `Token incorrecto`,
    });
  }
};

module.exports = { validarJWT };
