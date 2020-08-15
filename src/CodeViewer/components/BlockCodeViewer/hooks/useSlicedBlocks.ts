import * as React from 'react';

type SlicedBlock = {
  id: string;
  value: string;
  lineCount: number;
};

function createSlicedBlock(): SlicedBlock {
  return {
    id: Math.random().toString(36),
    value: '',
    lineCount: 0,
  };
}

export const useSlicedBlocks = (value: string, maxLines: number | null) => {
  return React.useMemo<SlicedBlock[] | null>(() => {
    if (maxLines === null) {
      return null;
    }

    const blocks: SlicedBlock[] = [createSlicedBlock()];

    for (let i = 0, n = 0; i < value.length; i++) {
      const char = value[i];
      blocks[blocks.length - 1].value += char;

      if (char === '\n') {
        n++;

        if (n % maxLines === 0 && i + 1 !== value.length) {
          blocks[blocks.length - 1].lineCount = n;
          blocks.push(createSlicedBlock());
        }
      }
    }

    return blocks;
  }, [value, maxLines]);
};
