import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization; // Expect "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    // ✅ store user info here, NOT in req.body
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

export default authUser;