const jwt = require('jsonwebtoken');
const config = require('./../keys/config');

const verifyToken = async (req, res, next) => {
  try {
    const token = await req.header('x-auth-token');
    if (!token)
      return res.status(403).send({ auth: false, msg: 'No Token Provided' });

    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, msg: 'Failed to authenticate token.' });

      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
