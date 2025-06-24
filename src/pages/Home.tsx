import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/ProductList';
import Background3D from '../components/common/Background3D';
import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import { useTheme } from '../context/ThemeContext';

export const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${styles.container} ${isDarkMode ? commonStyles.dark : commonStyles.light}`}
    >
      <Background3D />
      {error && <div className={styles.error}>{error}</div>}
      <ProductList products={products} isLoading={loading} />
    </div>
  );
};
