import { useState } from 'react';
import { Product } from '../../types/product';
import styles from '../../styles/Product.module.css';

interface ProductCardProps {
  product: Product;
  isDarkMode: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isDarkMode,
}) => {
  const [hoverIndex, setHoverIndex] = useState(0);

  const images = product.images || [];
  const currentImage = images[hoverIndex] || { url: '', altText: '' };

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setHoverIndex(prev => (prev + 1) % images.length);
    }
  };

  return (
    <div
      className={`${styles.productCard} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div
        className={styles.productImageContainer}
        onMouseEnter={handleMouseEnter}
      >
        {images.length > 0 ? (
          <img
            src={currentImage.url}
            alt={currentImage.altText || `Product ${product.id}`}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.noImage}>Không có ảnh</div>
        )}
      </div>
      <h2 className={styles.productName}>
        {product.descriptionInfo?.name || 'Sản phẩm không tên'}
      </h2>
    </div>
  );
};
