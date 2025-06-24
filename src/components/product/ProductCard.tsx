import { useState } from 'react';
import { Product } from '../../types/product';
import styles from '../../styles/ProductCard.module.css';
import commonStyles from '../../styles/Common.module.css';

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
    <div className={isDarkMode ? commonStyles.dark : commonStyles.light}>
      <div className={styles['product-card']} onMouseEnter={handleMouseEnter}>
        <div className={styles['product-image-container']}>
          {images.length > 0 ? (
            <img
              src={currentImage.url || 'https://via.placeholder.com/150'}
              alt={currentImage.altText || `Product ${product.id}`}
              className={styles['product-image']}
            />
          ) : (
            <div className={styles['no-image']}>Không có ảnh</div>
          )}
        </div>
        <h2 className={styles['product-name']}>
          {product.descriptionInfo?.name || 'Sản phẩm không tên'}
        </h2>
      </div>
    </div>
  );
};
