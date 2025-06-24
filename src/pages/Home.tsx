import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/ProductList';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log('Products:', products, 'Current:', currentProducts);

  return (
    <div
      className={`${styles.container} ${isDarkMode ? commonStyles.darkMode : commonStyles.lightMode}`}
    >
      {error && <div className={styles.error}>{error}</div>}
      <ProductList products={currentProducts} isLoading={loading} />
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
