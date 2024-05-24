const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are both required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;