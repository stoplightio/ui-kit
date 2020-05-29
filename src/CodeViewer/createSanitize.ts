import * as DOMPurify from 'dompurify';

export const createSanitize = (sanitizeConfig: DOMPurify.Config) => {
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

  const sanitizer = DOMPurify(domEnv);
  const innerSanitizer = DOMPurify(domEnv);

  // escape instead of remove if possible
  sanitizer.addHook('beforeSanitizeElements', node => {
    const sanitized = innerSanitizer.sanitize(node.outerHTML, sanitizeConfig);
    if (((sanitized as unknown) as string).trim().length === 0 && node.parentElement && node.ownerDocument) {
      node.parentElement.insertBefore(node.ownerDocument.createTextNode(node.outerHTML || ''), node);
    }
  });

  return (source: string) => sanitizer.sanitize(source, sanitizeConfig);
};
