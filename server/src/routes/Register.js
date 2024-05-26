const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async(req, res) => {
  const { email, password, name, dept, isProfessor } = req.body;

  if (!email || !password || !name || (isProfessor && !dept)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

    try {
        console.log('error here!!');
        
        // if (isProfessor) {
        //   const professor = await prisma.professor.findFirst({
        //     where: {
        //       user: {
        //         email: email
        //       }
        //     }
        //   });
        //   // If not found in the Professor table
        //   if (!professor) {
        //     return res.status(403).json({ message: 'Professor가 아닙니다!' });
        //   }
        // }   

        if (isProfessor) {
          // Professor emails!
          const allowedProfEmails = ['prof@gmail.com',];
        
          if (!allowedProfEmails.includes(email)) {
            return res.status(403).json({ message: 'Professor가 아닙니다!' });
          }
        }
         

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          return res.status(409).json({ message: 'User already exists!' });
        }
        // Hash the password
        // console.log('error here!!2');
        // const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const user = await prisma.user.create({
          data: {
            email,
            password,
            name,
            dept: dept,
            isProfessor: isProfessor,
          },
        });
        
        if (isProfessor) {
          await prisma.professor.create({
            data: {
              user_id: user.id,
            },
          });
        } else {
          // If the user is a student, add to the student table
          await prisma.student.create({
            data: {
              user_id: user.id,
            },
          });
        }
    
        res.status(201).json(user);
        console.log('error here!!3');
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

module.exports = router;