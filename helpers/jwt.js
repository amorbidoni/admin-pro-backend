const jwt = require('jsonwebtoken');

const getJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) {
          console.log(`Error al generar token ${err}`);
          reject('No se pudo generar el jsw');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { getJWT };
