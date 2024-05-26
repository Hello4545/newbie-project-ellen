const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
  const { lab_name,
    location,
    website,
    field,
    description,
    contacts,
    prof_id, } = req.body;

  if (!prof_id){
    return res.status(401).json({ message: 'Not a professor!' });
  }
  
  if (!lab_name || !location || !field || !description || !contacts || !prof_id) {
    return res.status(400).json({ message: 'Fill all the requirements!' });
  }

  try {
    const lab = await prisma.Labs.create({
        data: {
            lab_name,
            location,
            website,
            field,
            description,
            contacts,
            prof_id
        },
      });
    res.status(201).json(lab);
  } catch (error) {
    console.error("Error adding lab:", error);
        res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;