import { Router } from "express";
import createToken from "../utils/jwt.ts";
import User from "../models/user.ts";
import { compare, hash } from "bcrypt";
const router = Router();

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
    const token = await createToken({ id: newUser.id });
    return res.json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      accessToken: token,
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
    const token = await createToken({ id: user.id });
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/logout", (req, _res) => {
  return _res.json({ msg: "sesion cerrada correctamente" });
});

export default router;
