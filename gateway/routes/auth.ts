import { Router } from "express";
import type { AuthenticatedRequest } from "../middleware/verifyToken.ts";
import verifyToken from "../middleware/verifyToken.ts";
// interface AuthResponse {
//   accessToken: string;
//   id: string;
//   username: string;
//   email: string;
// }

const router = Router();
router.post("/register", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = (await response.json()) as {
      accessToken: string;
      [key: string]: any;
    };

    if (!response.ok) {
      return res.status(400).json(data);
    }
    res.cookie("token", data.accessToken);
    return res.status(201).json(data);
  } catch (error) {
    console.error("Error en gateway register:", error);
    res.status(500).json({ msg: "error en la comunicación con auth" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = (await response.json()) as {
      accessToken: string;
      [key: string]: any;
    };

    if (!response.ok) {
      return res.status(400).json(data);
    }
    res.cookie("token", data.accessToken);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en gateway register:", error);
    res.status(500).json({ msg: "error en la comunicación con auth" });
  }
});
router.post("/logout", verifyToken, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id;
  const respuesta = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId ?? "",
    },
    body: JSON.stringify(req.body),
  });
  const data = await respuesta.json();
  res.clearCookie("token");
  return res.json(data);
});

export default router;
