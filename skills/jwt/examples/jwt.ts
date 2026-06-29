import jwt from 'jsonwebtoken';

// Sign
const token = jwt.sign({ userId: 123 }, 'super_secret', { expiresIn: '15m', algorithm: 'HS256' });

// Verify
try {
  const decoded = jwt.verify(token, 'super_secret', { algorithms: ['HS256'] });
  console.log(decoded.userId);
} catch (err) {
  console.error('Invalid token');
}