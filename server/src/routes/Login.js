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

    const isValid = (password == user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      isProfessor: user.isProfessor, 
      name: user.name
    };
    console.log('session', req.session.user);

    req.session.save((err) => {
      if (err) {
          return res.status(500).json({ error: 'Session failed' });
      }
      // res.sendStatus(user.id);
      return res.status(200).json({ message: 'Login successful', user: req.session.user });
  });
    // res.status(200).json({ message: 'Login successful.', user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.get('/check-login', (req, res) => {
//   console.log(req.session)
//   if (req.session && req.session.user) {
//       res.status(200).json({ isLoggedIn: true, user: req.session.user });
//   } else {
//       res.status(200).json({ isLoggedIn: false });
//   }
// });

module.exports = router;