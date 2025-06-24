import { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Loading } from '../common/Loading';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/ProductList.module.css';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
}) => {
  const { isDarkMode } = useTheme();
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    console.log('Products length:', products.length);
    setVisibleCards(new Array(products.length).fill(false));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          console.log(`Card ${index} isIntersecting:`, entry.isIntersecting);
          setVisibleCards(prev =>
            prev.map((visible, i) =>
              i === index ? entry.isIntersecting : visible
            )
          );
        });
      },
      {
        threshold: 0.05, // Giảm để dễ kích hoạt
        rootMargin: '0px 0px -20px 0px',
      }
    );

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString());
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [products]);

  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <p className={styles.noProduct}>Chưa có sản phẩm nào.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product, index) => (
        <div
          className={`${styles.productCard} ${visibleCards[index] ? styles.visible : ''}`}
          key={product.id || index}
          ref={el => {
            cardRefs.current[index] = el;
          }}
          data-index={index}
        >
          <ProductCard product={product} isDarkMode={isDarkMode} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
