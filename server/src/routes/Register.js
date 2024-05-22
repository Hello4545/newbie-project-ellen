const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
    const {email, password} = req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
    
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });
    
        res.status(201).json(user);
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

module.exports = router;