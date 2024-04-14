
 const jwt = require('jsonwebtoken');


 const authenticateUser = (req, res, next) => {
   const token = req.header('Authorization');
   if (!token) return res.status(401).json({ error: 'Access Denied' });
 
   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
     if (err) return res.status(403).json({ error: 'Invalid Token' });
 
     req.user = user;
     next();
   });
 };
 
 module.exports = authenticateUser;