import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from '../../styles/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles.primaryButton]: variant === 'primary',
          [styles.secondaryButton]: variant === 'secondary',
          [styles.iconButton]: variant === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
