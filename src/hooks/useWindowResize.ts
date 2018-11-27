import debounce = require('lodash/debounce');
import * as React from 'react';

export function useWindowResize() {
  const [timestamp, setTimestamp] = React.useState(Date.now());

  if (typeof window !== 'undefined') {
    React.useEffect(() => {
      const resizeHandler = debounce<EventListener>((e: Event) => {
        setTimestamp(e.timeStamp);
      }, 16);

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }, []);
  }

  return timestamp;
}
