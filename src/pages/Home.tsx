import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import Banner from './../components/banner/Banner';
import ChatWidget from '../components/chat/ChatWidget';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsVisible = entry.isIntersecting;
        if (newIsVisible) {
          setHasAnimated(false); // Reset để lặp lại hiệu ứng khi vào khung nhìn
        }
        setIsVisible(newIsVisible);
      },
      { threshold: 0.1 } // Giảm threshold để dễ kích hoạt hơn
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`${styles.container} ${isDarkMode ? commonStyles.darkMode : commonStyles.lightMode}`}
    >
      <div className={styles.contentWrapper}>
        <div
          ref={bannerRef}
          className={`${styles.bannerWrapper} ${isVisible ? styles.slideDown : ''}`}
        >
          <Banner />
        </div>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
      </div>
      <ChatWidget isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;
