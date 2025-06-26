import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'asdfasdfasdf';
const EXPIRY = '1d';

export const generateToken = (payload: object) => {
  console.log("Generated jwt Token \n");
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
};

export const verifyToken = (token: string) => {
  console.log("Verifying jwt Token...", token)
  return jwt.verify(token, SECRET);
};
