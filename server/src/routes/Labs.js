const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const labs = await prisma.labs.findMany();
        res.json(labs);
    } catch (error) {
        console.error('Failed to fetch labs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
