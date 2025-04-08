import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите организации',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option: Option) => {
    const isSelected = value.some((item) => item.key === option.key);
    if (isSelected) {
      onChange(value.filter((item) => item.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <div
        className={`${styles.select} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.length > 0 ? value.map(v => v.value).join(', ') : placeholder}
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && !disabled && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.key}
              className={`${styles.option} ${value.some((item) => item.key === option.key) ? styles.selected : ''
                }`}
              onClick={() => toggleOption(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
