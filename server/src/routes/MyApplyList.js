const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { userID } = req.body;
    console.log(typeof(userID));
    console.log("approf"+userID);
    try {
        const applications = await prisma.apply.findMany({
            where: {
                User: {
                    id: userID,
                }
            },
            include: {
                Labs: true,
                User: true,
            },
        });

        res.json(applications);
        console.log("applications!"+applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
