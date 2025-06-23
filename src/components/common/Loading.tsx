import React from 'react';
import styles from '../../styles/Product.module.css'; // Hoặc dùng App.css

export const Loading: React.FC = () => {
  return <div className={styles.loading}>Đang tải sản phẩm...</div>;
};
