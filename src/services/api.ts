const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://mongod-1.onrender.com/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
export const fetchBanners = async () => {
  const response = await fetch(`${API_BASE_URL}/banners?page=0`, {
    method: 'GET',
  });
  if (!response.ok) throw new Error('Failed to fetch banners');
  return response.json();
};
