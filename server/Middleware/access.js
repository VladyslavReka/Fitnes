import jwt from 'jsonwebtoken';

// Перевірка токена
export const verifyToken = (req, res, next) => {
  // const token = req.headers['authorization'];
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Перевірка на тренера
export const isTrainer = (req, res, next) => {
  if (req.user.role === 'trainer') return next();
  return res.status(403).send('Access denied');
};

// Перевірка на менеджера
export const isManager = (req, res, next) => {
  if (req.user.role === 'manager') return next();
  return res.status(403).send('Access denied');
};