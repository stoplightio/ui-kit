export const FixedSizeList = jest.fn(({ children }) => children);
Object.defineProperty(FixedSizeList, 'displayName', { value: 'FixedSizeList' });
export const VariableSizeList = jest.fn(({ children }) => children);
Object.defineProperty(VariableSizeList, 'displayName', { value: 'VariableSizeList' });
