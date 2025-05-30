const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/dashboard", authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.user.id) }, // <-- Ensure this is a number
    select: {
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({
    message: "Welcome to the protected dashboard route!",
    user: {
      ...user,
      joined: new Date(user.createdAt).toLocaleDateString(),
    },
  });
});

module.exports = router;
