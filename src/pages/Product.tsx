import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/ProductList';
import { Button } from '../components/common/Button';

export const Product: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <article className={`container ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Cửa hàng sản phẩm</h1>
        <Button variant="secondary" onClick={toggleDarkMode}>
          {isDarkMode ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
        </Button>
      </header>
      {error && <p className="error">{error}</p>}
      <ProductList products={products} isLoading={loading} />
    </article>
  );
};
