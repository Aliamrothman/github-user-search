import React from 'react';
import styles from './IconButton.module.scss';

export type IconButtonProps = {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
