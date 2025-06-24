import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const images = product.images || [];
  const currentImage = images[hoverIndex] || { url: '', altText: '' };

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setHoverIndex(prev => (prev + 1) % images.length);
    }
  };

  useEffect(() => {
    if (!cardRef.current || !canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(cardRef.current.offsetWidth, cardRef.current.offsetHeight);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(currentImage.url || '/placeholder.png');
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      plane.rotation.y = mouseX * 0.2; // Nghiêng nhẹ theo chuột
      plane.rotation.x = mouseY * 0.2;
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    cardRef.current.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      renderer.setSize(
        cardRef.current!.offsetWidth,
        cardRef.current!.offsetHeight
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cardRef.current?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [currentImage.url]);

  return (
    <div
      ref={cardRef}
      className={`${styles['product-card']} ${isDarkMode ? commonStyles.dark : commonStyles.light}`}
      onMouseEnter={handleMouseEnter}
    >
      <div className={styles['product-image-container']}>
        {images.length > 0 ? (
          <canvas ref={canvasRef} className={styles['product-image']} />
        ) : (
          <div
            className={`${styles['no-image']} ${isDarkMode ? commonStyles.dark : commonStyles.light}`}
          >
            Không có ảnh
          </div>
        )}
      </div>
      <h2 className={styles['product-name']}>
        {product.descriptionInfo?.name || 'Sản phẩm không tên'}
      </h2>
    </div>
  );
};
