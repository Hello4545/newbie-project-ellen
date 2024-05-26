const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { profID } = req.body;
    console.log(typeof(profID));
    console.log("approf"+profID);
    try {
        const applications = await prisma.apply.findMany({
            where: {
                Labs: {
                    prof_id: profID,
                },
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
