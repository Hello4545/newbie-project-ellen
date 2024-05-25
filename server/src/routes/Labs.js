const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const labs = await prisma.labs.findMany();
        // const labs = await prisma.labs.findMany({
        //     include: {
        //         Professor: {
        //             include: {
        //                 user: {
        //                     this.name: true
        //                 }
        //             }
        //         }
        //     }
        // });
        


        // const flattenedLabs = labs.map(lab => ({
        //     lab_id: lab.lab_id,
        //     lab_name: lab.lab_name,
        //     location: lab.location,
        //     website: lab.website,
        //     field: lab.field,
        //     professor_name: lab.Professor.user.name,
        //     professor_email: lab.Professor.user.email
        // }));

        res.json(labs);
        // res.json(flattenedLabs);
        console.log(labs);
    } catch (error) {
        console.error('Failed to fetch labs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
