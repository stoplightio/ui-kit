import * as Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-ocaml';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';

export const highlightCode = (code: string = '', language: string, showLineNumbers?: boolean) => {
  const langDef = Prism.languages[language];
  if (!code || !langDef) {
    if (showLineNumbers) {
      return `<span class="line-number"></span>${code}`;
    }

    return code;
  }

  try {
    const result = Prism.highlight(code, langDef, language);

    if (showLineNumbers) {
      const splitOnNewLines = result.split('\n');
      if (splitOnNewLines.length) {
        return splitOnNewLines.map(line => `<span class="line-number"></span>${line}`).join('\n');
      }

      return `<span class="line-number"></span>${splitOnNewLines[0]}`;
    }

    return result;
  } catch (error) {
    console.log('Error highlighting code:', error, code);
    return code;
  }
};
