import React, { useState } from 'react';

export default function NoteForm({ onAddNote }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddNote(text.trim());
      setText('');
    }
  };

  return (
    <div className="card create-card">
      <div className="card-header">
        <h2><i className="fa-solid fa-pen-to-square"></i> Create Note</h2>
        <span className="text-muted">{text.length} / 500</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="textarea-wrapper">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a note to store in MongoDB..."
            maxLength={500}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fa-solid fa-paper-plane"></i> Save to MongoDB
          </button>
        </div>
      </form>
    </div>
  );
}