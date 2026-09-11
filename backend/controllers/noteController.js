const Note = require('../models/noteModel');

// @desc    Get all notes
// @route   GET /api/notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    next(error); // Forwards error to global error middleware
  }
};

// @desc    Create a new note
// @route   POST /api/notes
const createNote = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      res.status(400);
      throw new Error('Please provide valid text for the note.');
    }

    const note = await Note.create({ text: text.trim() });
    res.status(201).json({ success: true, message: 'Note created successfully', data: note });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) {
      res.status(404);
      throw new Error(`Note not found with ID of ${noteId}`);
    }

    await note.deleteOne();
    res.status(200).json({ success: true, message: `Note ${noteId} deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, createNote, deleteNote };