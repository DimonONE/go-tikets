import { DefaultTheme } from '@react-navigation/native';

export const ThemeOptions = {
  ...DefaultTheme,
  dark: false,
  background: '#FFFFFF',
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9100',
    primaryLight: 'rgba(255, 145, 0, 0.15)',
    text: '#000',
    background: '#FFFFFF'
  },
};
