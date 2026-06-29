import { createContext, useContext } from 'react';
const ThemeCtx = createContext('light');
export const useTheme = () => useContext(ThemeCtx);