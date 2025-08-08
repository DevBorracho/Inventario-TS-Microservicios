import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

// Tipo exacto que tendrá el token
interface JWTPayload {
  id: string;
}

// Extiende Request para añadir la propiedad user
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

// Función auxiliar para verificar un token como promesa
const verifyJWT = (token: string, secret: string): Promise<JWTPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        return reject(err ?? new Error("Token inválido"));
      }
      resolve(decoded as JWTPayload);
    });
  });
};

const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ msg: "no tienes permisos" });
  }

  try {
    const payload = await verifyJWT(token, process.env.JWT_SECRET as string);
    req.user = payload;
    next();
  } catch {
    return res.status(500).json({ msg: "error al verificar el token sorry" });
  }
};

export default verifyToken;
