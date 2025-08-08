const API = 'http://localhost:8000/api/orcs';

export default {
  async getAll() {
    const res = await fetch(API);
    return res.json();
  },

  async get(id) {
    const res = await fetch(`${API}/${id}`);
    return res.json();
  },

  async create(data) {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async delete(id) {
    await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });
  }
}
