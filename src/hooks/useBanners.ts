import { useState, useEffect } from 'react';
import { fetchBanners } from '../services/api';

export const useBanners = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBanners();
      setBanners(data.data);
    } catch (err: unknown) {
      setError(
        `Lỗi khi tải banner: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return { banners, loading, error };
};
