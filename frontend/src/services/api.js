const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ApiService = {
  // GET /api/notes
  getNotes: async () => {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const data = await response.json();
    return { status: response.status, ok: response.ok, data };
  },

  // POST /api/notes
  createNote: async (text) => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    return { status: response.status, ok: response.ok, data };
  },

  // DELETE /api/notes/:id
  deleteNote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, { method: 'DELETE' });
    const data = await response.json();
    return { status: response.status, ok: response.ok, data };
  }
};