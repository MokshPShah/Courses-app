const express = require('express');
const router = express.Router();
const Course = require('../models/courses');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET ALL COURSES
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ADD COURSE
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, description } = req.body;

  const newCourse = new Course({
    title,
    description,
    image: req.file.filename,
  });

  await newCourse.save();
  res.json(newCourse);
});

// UPDATE COURSE
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { title, description } = req.body;

  const update = {
    title,
    description,
    ...(req.file && { image: req.file.filename }),
  };

  const course = await Course.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.json(course);
});

// DELETE COURSE
router.delete('/:id', auth, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
