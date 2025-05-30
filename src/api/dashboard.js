// src/api/dashboard.js
export const fetchDashboard = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/api/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Unauthorized');

  const data = await res.json();
  return data;
};
