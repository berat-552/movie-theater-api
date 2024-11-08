const express = require("express");
const { Show, User } = require("../../models/index");
const userRoutes = express.Router();

// GET all users
userRoutes.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET one user
userRoutes.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// GET all shows watched by a user
userRoutes.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: Show,
  });
  if (user) {
    res.json(user.Shows);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// PUT associate a user with a show they have watched
userRoutes.put("/:id/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(req.params.showId);
  if (user && show) {
    await user.addShow(show); // Assuming you have a many-to-many relationship set up
    res.json({ message: "Show associated with user successfully" });
  } else {
    res.status(404).json({ error: "User or show not found" });
  }
});

module.exports = userRoutes;
