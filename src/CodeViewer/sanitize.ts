import * as DOMPurify from 'dompurify';

let domEnv: Window;
if (DOMPurify.isSupported) {
  domEnv = window;
} else {
  const { JSDOM } = require('jsdom');
  domEnv = new JSDOM('').window;
}

if (!domEnv) {
  throw new Error(
    'In order to use useSanitizeHtml in a Server environment, please install optional peer dependency jsdom.',
  );
}

export const createSanitizer = () => DOMPurify(domEnv);
