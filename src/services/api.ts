const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
