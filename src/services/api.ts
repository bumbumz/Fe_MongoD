import { Product } from '../types/product';

const API_URL = 'http://localhost:8080/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    if (response.status === 204) return [];
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};