import { Product } from '../../types/product';
import { Button } from '../common/Button';
import styles from '../../styles/Product.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImages}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url} // Hiển thị ảnh đầu tiên
            alt={product.images[0].altText || `Product ${product.id}`}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.noImage}>Không có hình ảnh</div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h2>{product.descriptionInfo?.name || 'Sản phẩm không tên'}</h2>
        <p>{product.descriptionInfo?.description || 'Chưa có mô tả.'}</p>
        <p>
          <strong>Giá:</strong> {product.price ? `$${product.price.toFixed(2)}` : 'Liên hệ'}
        </p>
        <p>
          <strong>Tồn kho:</strong> {product.availability?.quality || 0}
        </p>
      </div>
      <Button variant="primary" onClick={() => alert(`Xem chi tiết sản phẩm ${product.id}`)}>
        Xem chi tiết
      </Button>
    </div>
  );
};