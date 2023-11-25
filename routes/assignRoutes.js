const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// API to assign a student to a mentor
router.post('/assignStudentToMentor', async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const existingStudent = await Student.findById(studentId);
    if (existingStudent.mentor) {
      return res.status(400).json({ error: 'Student already has a mentor.' });
    }

    const student = await Student.findByIdAndUpdate(studentId, { mentor: mentorId, previousMentor: existingStudent.mentor }, { new: true });
    await Mentor.findByIdAndUpdate(mentorId, { $addToSet: { students: studentId } });

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to change mentor for a particular student
router.put('/:studentId/assignMentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { newMentorId } = req.body;

    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Store the previous mentor ID
    const previousMentorId = existingStudent.mentor;

    if (existingStudent.mentor) {
      // Remove the student from the current mentor's list
      await Mentor.findByIdAndUpdate(existingStudent.mentor, { $pull: { students: studentId } });
    }

    // Assign the student to the new mentor
    const student = await Student.findByIdAndUpdate(studentId, { mentor: newMentorId, previousMentor: previousMentorId }, { new: true });

    // Add the student to the new mentor's list
    await Mentor.findByIdAndUpdate(newMentorId, { $addToSet: { students: studentId } });

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
