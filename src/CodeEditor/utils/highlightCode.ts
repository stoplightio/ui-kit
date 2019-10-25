import * as Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-yaml';

export const highlightCode = (code: string, language: string, showLineNumbers?: boolean) => {
  const langDef = Prism.languages[language];
  if (!code || !langDef) return code;

  try {
    const result = Prism.highlight(code, langDef, language);

    if (showLineNumbers) {
      return result
        .split('\n')
        .map(line => `<span class="line-number"></span>${line}`)
        .join('\n');
    }

    return result;
  } catch (error) {
    console.log('Error highlighting code:', error, code);
    return code;
  }
};
