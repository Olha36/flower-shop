const express = require("express");
const router = express.Router();
const Flower = require("../models/flower");

// getting all
router.get("/", async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// getting one
router.get("/:id", getFlower, (req, res) => {
  res.json(res.flower);
});

// creating one
router.post("/", async (req, res) => {
  const flower = new Flower({
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
  });

  try {
    const newFlower = await flower.save();
    res.status(201).json(newFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one
router.patch("/:id", getFlower, async (req, res) => {
  if (req.body.name != null) {
    res.flower.name = req.body.name;
  }
  if (req.body.color != null) {
    res.flower.color = req.body.color;
  }

  try {
    const updatedFlower = await res.flower.save();
    res.json(updatedFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one
router.delete("/:id", getFlower, async (req, res) => {
  try {
    await res.flower.deleteOne();
    res.json({ message: "Deleted flower" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFlower(req, res, next) {
  let flower;
  try {
    flower = await Flower.findById(req.params.id);
    if (flower == null) {
      return res.status(404).json({ message: "Cannot find a flower" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.flower = flower;
  next();
}

module.exports = router;
