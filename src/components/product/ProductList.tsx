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
    console.log('Products length:', products.length); // Debug số sản phẩm
    console.log('Visible cards init:', visibleCards); // Debug trạng thái hiển thị

    // Khởi tạo mảng hiển thị
    setVisibleCards(new Array(products.length).fill(false));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          console.log(`Card ${index} isIntersecting:`, entry.isIntersecting); // Debug observer
          setVisibleCards(prev =>
            prev.map((visible, i) =>
              i === index ? entry.isIntersecting : visible
            )
          );
        });
      },
      {
        threshold: 0.1, // Giảm threshold để dễ kích hoạt hơn
        rootMargin: '0px 0px -30px 0px', // Kích hoạt sớm hơn
      }
    );

    // Theo dõi từng thẻ
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString());
        observer.observe(ref);
      }
    });

    // Dọn dẹp
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
