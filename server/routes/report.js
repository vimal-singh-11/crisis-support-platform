const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");

// POST /api/reports - Create new report
router.post("/", authenticateToken, async (req, res) => {
  const { title, description } = req.body;

  try {
    const report = await prisma.report.create({
      data: {
        title,
        description,
        userId: req.user.id, // From JWT middleware
        status: "Pending", // default
      },
    });

    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report." });
  }
});
// GET /api/reports - View all reports (admin) or own reports (user)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: req.user.role === "admin" ? {} : { userId: req.user.id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports." });
  }
});
 router.put("/:id/status", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.report.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.report.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


module.exports = router;
