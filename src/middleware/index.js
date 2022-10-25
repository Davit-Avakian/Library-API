const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader?.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err) => {
    if (err) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Access token is invalid or expired' });
    }

    next();
  });
};

exports.verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const token = authHeader?.split(' ')[1];

    const { role } = jwt.decode(token);

    const allowed = allowedRoles.some((allowedRole) => allowedRole === role);

    if (!allowed) {
      return res.status(401).json({ status: 'error', message: 'Role not allowed' });
    }

    next();
  };
};
