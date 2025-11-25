import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Error:', err);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach user info to request
    next();
  });
};


export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden — insufficient permissions' });
    }
    next();
  };
};


export const requireSelfOrAdmin = async (req, res, next) => {
  try {
    if (req.user?.role === 'librarian') return next(); // admins bypass

    const targetId = parseInt(req.params.id, 10);
    if (Number.isNaN(targetId)) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    // For checkout routes, verify ownership via the checkout record
    if (req.baseUrl.startsWith('/checkouts')) {
      const checkout = await prisma.checkout.findUnique({
        where: { checkoutId: targetId },
        select: { userId: true },
      });

      if (!checkout) return res.status(404).json({ error: 'Checkout not found' });
      if (checkout.userId === req.user.userId) return next();

      return res.status(403).json({ error: 'Forbidden — cannot access other users checkouts' });
    }

    // For user routes, compare param against the authenticated user
    if (req.user.userId === targetId) return next();

    return res.status(403).json({ error: 'Forbidden — cannot edit other users' });
  } catch (err) {
    console.error('Ownership check failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const requireActiveUser = async (req, res, next) => {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { userId: req.user.userId },
    });

    if (!dbUser || dbUser.status !== 'active') {
      return res.status(403).json({ error: 'Account inactive or banned' });
    }

    next();
  } catch (err) {
    console.error('Active user check failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
