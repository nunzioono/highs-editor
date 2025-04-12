// filepath: src/hooks/zoom.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const MIN_ZOOM = 0.5; // 10%
const MAX_ZOOM = 2.0; // 200%
const DEFAULT_ZOOM = 1.0; // 100%

interface ZoomContextType {
  zoomLevel: number;
  setZoomLevel: (level: number | ((prevLevel: number) => number)) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zoomLevel, setZoomState] = useState<number>(DEFAULT_ZOOM);

  // Create a setter function that clamps the value
  const setClampedZoomLevel = useCallback((levelInput: number | ((prevLevel: number) => number)) => {
    setZoomState(prevLevel => {
      const newLevel = typeof levelInput === 'function' ? levelInput(prevLevel) : levelInput;
      // Clamp the new level between MIN_ZOOM and MAX_ZOOM
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newLevel));
    });
  }, []);

  return (
    <ZoomContext.Provider value={{ zoomLevel, setZoomLevel: setClampedZoomLevel }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = (): ZoomContextType => {
  const context = useContext(ZoomContext);
  if (context === undefined) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
};
