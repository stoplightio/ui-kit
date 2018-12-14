import { useTheme } from './';

export const colorMixin = (state: string, componentName: string) => {
  const theme = useTheme()[componentName];

  if (typeof theme !== 'object') {
    return null;
  }

  const backgroundColor = theme[state === '' ? 'bg' : `${state}Bg`];
  const color = theme[state === '' ? 'fg' : `${state}Fg`];
  const borderColor = theme[state === '' ? 'border' : `${state}Border`];

  const values = {
    ...(backgroundColor ? { backgroundColor } : null),
    ...(color ? { color } : null),
    ...(borderColor ? { borderColor } : null),
  };

  return state === '' ? values : { [`:${state}`]: values };
};
