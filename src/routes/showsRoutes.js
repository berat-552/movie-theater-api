const express = require("express");
const { Show, User } = require("../../models/index");

const showRoutes = express.Router();

// GET all shows
showRoutes.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

// GET one show
showRoutes.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    res.json(show);
  } else {
    res.status(404).json({ error: "Show not found" });
  }
});

// GET all users who watched a show
showRoutes.get("/:id/users", async (req, res) => {
  const show = await Show.findByPk(req.params.id, {
    include: User,
  });
  if (show) {
    res.json(show.Users);
  } else {
    res.status(404).json({ error: "Show not found" });
  }
});

// PUT update the available property of a show
showRoutes.put("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    show.available = req.body.available;
    await show.save();
    res.json({ message: "Show updated successfully" });
  } else {
    res.status(404).json({ error: "Show not found" });
  }
});

// DELETE a show
showRoutes.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    await show.destroy();
    res.json({ message: "Show deleted successfully" });
  } else {
    res.status(404).json({ error: "Show not found" });
  }
});

// GET shows of a particular genre
showRoutes.get("/genre", async (req, res) => {
  const shows = await Show.findAll({
    where: {
      genre: req.query.genre,
    },
  });
  res.json(shows);
});

module.exports = showRoutes;
