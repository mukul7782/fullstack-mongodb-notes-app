const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');

// Handles /api/notes
router.route('/')
  .get(getNotes)
  .post(createNote);

// Handles /api/notes/:id
router.route('/:id')
  .delete(deleteNote);

module.exports = router;