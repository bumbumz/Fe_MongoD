import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/ProductList';
import styles from '../styles/Product.module.css';

export const Home: React.FC = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      <ProductList products={products} isLoading={loading} />
    </div>
  );
};
