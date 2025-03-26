import React, { createContext, useContext, useEffect, useState } from 'react';

interface KeyboardContextType {
  pressedKeys: Set<string>;
  lastKeyPress: string | null;
}

const KeyboardContext = createContext<KeyboardContextType>({
  pressedKeys: new Set<string>(),
  lastKeyPress: null,
});

export const KeyboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set<string>());
  const [lastKeyPress, setLastKeyPress] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.add(event.key);
        return newSet;
      });
      setLastKeyPress(event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ pressedKeys, lastKeyPress }}>
      {children}
    </KeyboardContext.Provider>
  );
};

// Custom hook to use the keyboard context
export const useKeyboard = () => {
  const context = useContext(KeyboardContext);

  if (!context) {
    throw new Error('useKeyboard must be used within a KeyboardProvider');
  }

  // Helper function to check if a specific key combination is pressed
  const isPressed = (key: string, withCtrl = false, withShift = false, withAlt = false) => {
    const keys = context.pressedKeys;
    const modifiersMatch =
      (withCtrl === keys.has('Control') || withCtrl === keys.has('Meta')) &&
      (withShift === keys.has('Shift')) &&
      (withAlt === keys.has('Alt'));

    return keys.has(key) && modifiersMatch;
  };

  return {
    ...context,
    isPressed,
  };
};
