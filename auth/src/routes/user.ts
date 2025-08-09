import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.ts";
import type { AuthenticatedRequest } from "../middlewares/verifyToken.ts";
import createToken from "../utils/jwt.ts";
import User from "../models/user.ts";
import { compare, hash } from "bcrypt";
const router = Router();

router.get("/profile", verifyToken, async (req: AuthenticatedRequest, res) => {
  const id = req.user;
  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (_error) {
    return res.status(500).json({ msg: "error al obtener perfil" });
  }
});
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash: string = await hash(password, 8);
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "el usuario ya existe" });
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });
    await newUser.save();
    const token = await createToken(newUser.id);
    return res.json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: token,
    });
  } catch (error) {
    return res.json(error);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "email invalido" });
    const userMatch = await compare(password, user.password as string);
    if (!userMatch) return res.json({ msg: "password invalida" });
    const token = await createToken(user.id);
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
