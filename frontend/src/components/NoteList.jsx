import React, { useState } from 'react';

export default function NoteList({ notes, onDeleteNote, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n =>
    n.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="card notes-card">
      <div className="card-header flex-between">
        <div className="header-title">
          <h2><i className="fa-solid fa-box-archive"></i> Database Notes</h2>
          <span className="badge badge-count">{notes.length} items</span>
        </div>
        <div className="header-tools">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
            />
          </div>
          <button onClick={onRefresh} className="btn btn-icon" title="Refresh Notes">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-folder-open spinner-large" style={{ color: 'var(--text-dim)' }}></i>
            <p>No documents found in MongoDB.</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div key={note._id} className="note-item-card">
              <div className="note-content">
                <p>{note.text}</p>
                <div className="note-meta">
                  <span><i className="fa-regular fa-clock"></i> {new Date(note.createdAt).toLocaleTimeString()}</span>
                  <span className="mongo-tag"><i className="fa-solid fa-database"></i> {note._id}</span>
                </div>
              </div>
              <button onClick={() => onDeleteNote(note._id)} className="btn-danger-icon" title="Delete document">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}