// filepath: src/components/header/MenuButton.tsx
import React from 'react';

interface MenuButtonProps {
  action: string;
  disabled: boolean;
  onClick: () => void;
  children?: React.ReactNode; // Make children optional
}

const MenuButton = ({ action, disabled, onClick, children }: MenuButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <li
      className={"relative px-4 py-1 hover:bg-gray-100 cursor-pointer" + (disabled ? " opacity-50 cursor-not-allowed" : "")}
      onClick={handleClick}
    >
      {action}
      {children}
    </li>
  );
};

export default MenuButton;
