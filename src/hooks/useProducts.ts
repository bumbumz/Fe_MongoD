import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data.data);
    } catch (err: unknown) {
      setError(
        `Lỗi khi tải sản phẩm: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loading, error };
};
