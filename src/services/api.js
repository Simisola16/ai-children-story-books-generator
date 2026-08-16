const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
    return 'https://ai-children-story-books-generator-b.vercel.app/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Generic fetch wrapper with Bearer token authentication
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('storybook_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),

  // Children
  getChildren: () => request('/children'),
  getChild: (id) => request(`/children/${id}`),
  createChild: (data) =>
    request('/children', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateChild: (id, data) =>
    request(`/children/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  deleteChild: (id) =>
    request(`/children/${id}`, {
      method: 'DELETE',
    }),

  // Stories
  getStories: (childId) =>
    request(`/stories${childId ? `?childId=${childId}` : ''}`),
  getStory: (id) => request(`/stories/${id}`),
  createStory: (data) =>
    request('/stories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteStory: (id) =>
    request(`/stories/${id}`, {
      method: 'DELETE',
    }),
  getStoryLogs: (id) => request(`/stories/${id}/logs`),

  // PDF Export Download URL Helper
  getStoryPdfUrl: (storyId) => `${API_BASE_URL}/stories/${storyId}/pdf`,

  downloadPdf: async (storyId, filename = 'Storybook.pdf') => {
    const token = localStorage.getItem('storybook_token');
    const response = await fetch(`${API_BASE_URL}/stories/${storyId}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.message || 'Failed to download PDF');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  },
};
