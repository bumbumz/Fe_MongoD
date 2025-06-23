import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Loading } from '../common/Loading';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Product.module.css';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
}) => {
  const { isDarkMode } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <p className={styles.noProduct}>Chưa có sản phẩm nào.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};
