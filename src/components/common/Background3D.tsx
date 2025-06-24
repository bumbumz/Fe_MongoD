import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../../styles/Background.module.css';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on mobile for performance
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    if (!canvasRef.current) return;

    // Rest of the code remains the same
    const scene = new THREE.Scene();
    // ...
  }, []);

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    return null; // Don't render on mobile
  }

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Background3D;