import { comparePassword, createJWT, hashPassword } from "../module/auth";
import prisma from "../utils/db";

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isPasswordValid = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    res.status(401).json({ message: "really bruh?" });
  }

  const token = createJWT(user);
  res.json({ token });
};
