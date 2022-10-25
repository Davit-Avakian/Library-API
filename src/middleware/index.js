const jwt = require('jsonwebtoken');
require('dotenv').config();

// verify if access token is valid
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // get token from request header
  const token = authHeader?.split(' ')[1];

  // verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err) => {
    if (err) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Access token is invalid or expired' });
    }

    next();
  });
};

// verify if role is allowed
exports.verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // get token from request header
    const token = authHeader?.split(' ')[1];

    // decode role from token
    const { role } = jwt.decode(token);

    const allowed = allowedRoles.some((allowedRole) => allowedRole === role);

    // check if role is allowed
    if (!allowed) {
      return res.status(401).json({ status: 'error', message: 'Role not allowed' });
    }

    next();
  };
};
