const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
  const { student_no, years, motivation, interest, lab_id, user_id } = req.body;

  if (!user_id){
    return res.status(401).json({ message: 'Not logged in' });
  }
  
  if (!student_no || !years || !motivation || !interest) {
    return res.status(400).json({ message: 'Fill all the requirements!' });
  }

  try {
    const apply = await prisma.Apply.create({
        data: {
            student_no, years, motivation, interest, lab_id, user_id
        },
      });
    res.status(201).json(apply);
    // res.status(200).json({ message: 'Login successful.', user: user });
  } catch (error) {
    console.error("Error registering application form:", error);
        res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;