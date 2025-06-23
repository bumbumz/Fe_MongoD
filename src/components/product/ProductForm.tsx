import { useState } from 'react';
import { Product } from '../../types/product';
import styles from '../../styles/Product.module.css';

interface ProductFormProps {
  onSubmit: (product: Partial<Product>) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    quality: 0,
    price: '',
    visible: true,
    imageUrl: '',
    imageAltText: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sku: formData.sku,
      visible: formData.visible,
      descriptionInfo: {
        name: formData.name,
        description: formData.description,
      },
      availability: {
        quality: formData.quality,
      },
      price: parseFloat(formData.price) || 0,
      images: formData.imageUrl
        ? [{ url: formData.imageUrl, altText: formData.imageAltText, order: 1, thumbnail: false }]
        : [],
    });
    setFormData({
      sku: '',
      name: '',
      description: '',
      quality: 0,
      price: '',
      visible: true,
      imageUrl: '',
      imageAltText: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <h2>Thêm sản phẩm mới</h2>
      <input
        type="text"
        placeholder="SKU"
        value={formData.sku}
        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Mô tả"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={formData.quality}
        onChange={(e) => setFormData({ ...formData, quality: parseInt(e.target.value) })}
        required
      />
      <input
        type="number"
        placeholder="Giá"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL ảnh"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />
      <input
        type="text"
        placeholder="Mô tả ảnh"
        value={formData.imageAltText}
        onChange={(e) => setFormData({ ...formData, imageAltText: e.target.value })}
      />
      <label>
        Hiển thị:
        <input
          type="checkbox"
          checked={formData.visible}
          onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
        />
      </label>
      <button type="submit">Thêm sản phẩm</button>
    </form>
  );
};