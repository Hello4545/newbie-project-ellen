const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { lab_id } = req.body;

    try {
        const lab = await prisma.labs.findUnique({
          where: { lab_id: lab_id }
        });
    
        if (!lab) {
          return res.status(404).json({ message: 'Lab not found.' });
        }        
        return res.status(200).json({ message: 'Lab found', lab });
        // res.status(200).json({ message: 'Login successful.', user: user });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

module.exports = router;


