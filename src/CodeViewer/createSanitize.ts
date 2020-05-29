import * as DOMPurify from 'dompurify';

export const createSanitize = (sanitizeConfig: Omit<DOMPurify.Config, 'RETURN_DOM_FRAGMENT' | 'RETURN_DOM'>) => {
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

  // escape instead of remove if possible
  sanitizer.addHook('beforeSanitizeElements', node => {
    // Text Nodes are OK, we can leave them alone.
    if (node.nodeType === node.TEXT_NODE) return;

    // Element Nodes are BAD...
    if (node.nodeType === node.ELEMENT_NODE) {
      // unless they are <span class="token ...">TEXT_NODE</span>
      // Note: node.children returns only element nodes. spans containing only text nodes
      // will still satisfy the condition node.children.length === 0
      if (node.tagName === 'SPAN' && node.classList.contains('token') && node.children?.length === 0) {
        return;
      }
      // We need to stringify element nodes, starting at the BOTTOM so that <span class="token"> nodes aren't
      // stringified. Therefore, we check if this is a leaf node.
      if (node.children?.length === 0) {
        // Because TypeScript, we need to assert the following properties are present.
        if (node.parentElement && node.ownerDocument && node.outerHTML) {
          // We replace this node with a text node containing HTML-escaped text
          console.log(`node.outerHTML:[${node.outerHTML}]`);
          const textNode = node.ownerDocument.createTextNode(node.outerHTML);
          node.parentElement.insertBefore(textNode || '', node);
          node.remove();
        }
      }
    }
  });

  return (source: string) => sanitizer.sanitize(source, sanitizeConfig);
};
