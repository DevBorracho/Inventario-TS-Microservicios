import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.ts";
import type { AuthenticatedRequest } from "../middlewares/verifyToken.ts";
import createToken from "../utils/jwt.ts";
import User from "../models/user.ts";
import { hash } from "bcrypt";
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
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });
    await newUser.save();
    return res.json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return res.json(error);
  }
});
router.post("/login", async (req, res) => {});
router.post("/logout", verifyToken, async (req, res) => {});

export default router;
