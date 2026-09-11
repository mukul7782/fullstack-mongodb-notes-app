const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide note text content'],
      trim: true,
      maxlength: [500, 'Note text cannot exceed 500 characters']
    }
  },
  {
    timestamps: true // Adds createdAt & updatedAt timestamps automatically
  }
);

module.exports = mongoose.model('Note', noteSchema);