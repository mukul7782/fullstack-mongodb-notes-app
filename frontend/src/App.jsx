import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import WeatherCard from './components/WeatherCard';
import NetworkInspector from './components/NetworkInspector';
import Toast from './components/Toast';
import { ApiService } from './services/api';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addLog = (method, url, status, payload, response) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, method, url, status, payload, response }, ...prev]);
  };

  const loadNotes = async () => {
    try {
      const res = await ApiService.getNotes();
      addLog('GET', '/api/notes', res.status, null, res.data);
      if (res.ok) {
        setNotes(res.data.data);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
      addLog('GET', '/api/notes', 'FAILED', null, { error: error.message });
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleAddNote = async (text) => {
    try {
      const res = await ApiService.createNote(text);
      addLog('POST', '/api/notes', res.status, { text }, res.data);
      if (res.ok) {
        showToast('Note saved to MongoDB!', 'success');
        loadNotes();
      } else {
        showToast(res.data.error || 'Failed to save', 'error');
      }
    } catch (error) {
      showToast('Server connection failed', 'error');
    }
  };

  const handleDeleteNote = async (id) => {
    if (!confirm('Delete document from MongoDB?')) return;
    try {
      const res = await ApiService.deleteNote(id);
      addLog('DELETE', `/api/notes/${id}`, res.status, null, res.data);
      if (res.ok) {
        showToast('Note deleted from MongoDB', 'success');
        loadNotes();
      }
    } catch (error) {
      showToast('Delete request failed', 'error');
    }
  };

  return (
    <div className="app-wrapper">
      <Toast toast={toast} />
      <Navbar isConnected={isConnected} />
      
      <main className="main-container">
        <section className="workspace-section">
          <NoteForm onAddNote={handleAddNote} />
          <NoteList notes={notes} onDeleteNote={handleDeleteNote} onRefresh={loadNotes} />
        </section>

        <aside className="sidebar-section">
          <WeatherCard onLogEvent={addLog} />
          <NetworkInspector logs={logs} onClearLogs={() => setLogs([])} />
        </aside>
      </main>
    </div>
  );
}