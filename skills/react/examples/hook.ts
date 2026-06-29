import { useState, useEffect } from 'react';
export function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
}