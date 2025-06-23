import { Product } from '../types/product';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://mongod-1.onrender.com/api/products';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
