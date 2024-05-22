const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
    const {email, password} = req.body;
    
    try {
        console.log('error here!!');
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
        // Hash the password
        console.log('error here!!2');
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: '',
          },
        });
        
    
        res.status(201).json(user);
        console.log('error here!!3');
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

module.exports = router;