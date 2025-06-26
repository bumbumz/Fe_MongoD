import { Button } from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from '../../styles/Header.module.css';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isMenuActive = location.pathname === '/menu';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prev => {
      const newState = !prev;
      console.log('Nav state changed to:', newState); // Debug state
      return newState;
    });
  };

  return (
    <header
      className={`${styles.header} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.logo}>
        <img
          src="https://katinat.vn/wp-content/uploads/2023/12/cropped-Kat-Logo-fa-rgb-05__1_-removebg-preview.png"
          alt="Katinat Logo"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.navContainer}>
        <button className={styles.hamburger} onClick={toggleNav}>
          ☰
        </button>
        <nav
          className={`${styles.nav} ${isNavOpen ? `${styles.navOpen} ${styles.active}` : ''}`}
        >
          <Link
            to="/"
            className={`${styles.navLink} ${isHomeActive ? styles.active : ''}`}
            onClick={() => setIsNavOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/menu"
            className={`${styles.navLink} ${isMenuActive ? styles.active : ''}`}
            onClick={() => setIsNavOpen(false)}
          >
            Menu
          </Link>
        </nav>
      </div>
      <Button
        variant="icon"
        onClick={toggleDarkMode}
        title={isDarkMode ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
        className={styles.themeButton}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </Button>
    </header>
  );
};
