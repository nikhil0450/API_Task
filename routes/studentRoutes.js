const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// API to create a student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get the previously assigned mentor for a particular student
router.get('/:studentId/previousMentor', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const previousMentorId = student.previousMentor;
    const previousMentor = await Mentor.findById(previousMentorId);

    res.json(previousMentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
