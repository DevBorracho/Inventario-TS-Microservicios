import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
}
const createToken = (payload: JWTPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err || !token) return reject(err ?? "el token es undefine");
        return resolve(token);
      }
    );
  });
};
export default createToken;
