const express = require('express');
const router = express.Router();
const Dress = require('../models/Dress');

// GET all dresses
router.get('/', async (req, res) => {
  try {
    const dresses = await Dress.find().sort({ createdAt: -1 });
    res.json(dresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single dress
router.get('/:id', async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: 'Dress not found' });
    }
    res.json(dress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE dress
router.post('/', async (req, res) => {
  const dress = new Dress({
    name: req.body.name,
    occasion: req.body.occasion,
    season: req.body.season,
    color: req.body.color,
    description: req.body.description
  });

  try {
    const newDress = await dress.save();
    res.status(201).json(newDress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE dress
router.put('/:id', async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: 'Dress not found' });
    }

    dress.name = req.body.name || dress.name;
    dress.occasion = req.body.occasion || dress.occasion;
    dress.season = req.body.season || dress.season;
    dress.color = req.body.color || dress.color;
    dress.description = req.body.description || dress.description;

    const updatedDress = await dress.save();
    res.json(updatedDress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE dress
router.delete('/:id', async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: 'Dress not found' });
    }
    await dress.deleteOne();
    res.json({ message: 'Dress deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;