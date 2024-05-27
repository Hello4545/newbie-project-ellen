const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { user_id } = req.body;
    console.log(typeof(user_id));
    console.log("approf"+user_id);
    try {
        const applications = await prisma.apply.findMany({
            where: {
                User: {
                    id: user_id,
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

router.post('/delete', async (req, res) => {
    const { apply_id } = req.body;
    console.log(typeof(apply_id));
    console.log("apply id : "+apply_id);
    try {
        const deletedApplication = await prisma.apply.delete({
            where: { apply_id: apply_id }
        });

        res.status(200).json(deletedApplication);
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
