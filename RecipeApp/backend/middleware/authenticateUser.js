const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  const token = authHeader.split(' ')[1];
  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;

    next();

} catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
