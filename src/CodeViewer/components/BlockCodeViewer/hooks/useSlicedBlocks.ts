import * as React from 'react';

class SlicedBlocks extends Array<string> {
  public length = 1;
  public [0] = '';
  public linesMap!: Map<number, number>;
}

Object.defineProperty(SlicedBlocks.prototype, 'linesMap', {
  value: new Map<number, number>(),
});

export const useSlicedBlocks = (value: string, maxLines: number | null) => {
  return React.useMemo<SlicedBlocks | null>(() => {
    if (maxLines === null) {
      return null;
    }

    const blocks = new SlicedBlocks();

    for (let i = 0, n = 0; i < value.length; i++) {
      const char = value[i];
      blocks[blocks.length - 1] += char;

      if (char === '\n') {
        n++;

        if (n % maxLines === 0 && i + 1 !== value.length) {
          blocks.linesMap.set(blocks.length - 1, n);
          blocks.push('');
        }
      }
    }

    return blocks;
  }, [value, maxLines]);
};
