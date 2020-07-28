import * as React from 'react';

export const useSlicedBlocks = (value: string, maxBlocks: number | null) => {
  return React.useMemo<string[] | null>(() => {
    if (maxBlocks === null) {
      return null;
    }

    const blocks: string[] = [''];

    for (let i = 0, n = 0; i < value.length; i++) {
      const char = value[i];
      blocks[blocks.length - 1] += char;

      if (char === '\n') {
        n++;

        if (n % maxBlocks === 0 && i + 1 !== value.length) {
          blocks.push('');
        }
      }
    }

    return blocks;
  }, [value, maxBlocks]);
};
