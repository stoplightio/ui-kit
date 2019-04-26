import * as React from 'react';
// import { scrollToHash } from '../../utils/scroll';

export const useScrollToHash = (elementId?: string) => {
  const targetScrollTo = elementId || (typeof window !== 'undefined' ? window.location.hash : null);

  React.useEffect(() => {
    if (targetScrollTo) {
      // scrollToHash(targetScrollTo);
    }
  }, [targetScrollTo]);
};
