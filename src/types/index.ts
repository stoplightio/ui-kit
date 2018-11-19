export * from './theme';
export { ICSSProps } from './cssProperties';

export type ValueOf<T> = T[keyof T];

// components created in this repo
export type Components = 'button' | 'checkbox' | 'input' | 'textarea' | 'toggle';
