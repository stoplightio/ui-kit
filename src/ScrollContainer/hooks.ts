import * as React from 'react';
import { positionValues } from 'react-custom-scrollbars';

import compact = require('lodash/compact');
import get = require('lodash/get');
import min = require('lodash/min');

export const useCalculateHeight = (
  setHeight: (height: number) => void,
  parent?: React.MutableRefObject<HTMLDivElement | null>,
  children?: React.MutableRefObject<HTMLDivElement | null>,
  maxHeight?: number
) => {
  React.useEffect(() => {
    const parentElem = get(parent, 'current.parentElement');
    const grandParentElem = get(parentElem, 'parentElement.clientHeight');
    const childElem = get(children, 'current.clientHeight');

    setHeight(min(compact([maxHeight, childElem, grandParentElem])));
  });
};

export const useSetRef = (
  parentRef: React.MutableRefObject<HTMLDivElement | null>,
  forwardedRef?: any
): ((scrollbarsRef: any) => void) => {
  return React.useCallback(scrollbarsRef => {
    parentRef.current = scrollbarsRef ? scrollbarsRef.view : null;
    if (forwardedRef) {
      forwardedRef(scrollbarsRef ? scrollbarsRef.view : null);
    }
  }, []);
};

export const useUpdateShadows = (
  parentRef: React.MutableRefObject<HTMLDivElement | null>,
  onUpdate?: (values: positionValues) => void,
  shadows?: boolean
) => {
  return React.useCallback(
    (values: positionValues) => {
      if (onUpdate) {
        onUpdate(values);
      }

      if (shadows && parentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

        parentRef.current.style.boxShadow = `inset 0 6px 6px -8px rgba(0, 0, 0, ${shadowTopOpacity}), inset 0 -6px 6px -8px rgba(0, 0, 0, ${shadowBottomOpacity})`;
      }
    },
    [shadows, onUpdate]
  );
};
