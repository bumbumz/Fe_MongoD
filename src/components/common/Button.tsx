import React, { ButtonHTMLAttributes } from 'react';
import styles from '../../../styles/Product.module.css'; // Hoặc dùng App.css

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const buttonClass = `${styles.button} ${
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton
  } ${className || ''}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};