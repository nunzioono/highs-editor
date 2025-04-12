// filepath: src/components/header/OpenButton.tsx
import React from 'react';
import MenuButton from './MenuButton'; // Import MenuButton

interface OpenButtonProps {
  setFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const OpenButton = ({ setFile, disabled }: OpenButtonProps) => {
  // Dummy onClick for MenuButton as the input handles the action
  const handleClick = () => {};

  return (
    <MenuButton action="Open" disabled={disabled} onClick={handleClick}>
      <input
        type="file"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" // Ensure cursor changes
        accept=".lp,.sav,.xlp,.xli"
        onChange={setFile}
        disabled={disabled} // Disable input as well
      />
    </MenuButton>
  );
};

export default OpenButton;
