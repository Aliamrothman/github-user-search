import React from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`${styles.button} ${loading ? styles.loading : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className={styles.spinner} />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
