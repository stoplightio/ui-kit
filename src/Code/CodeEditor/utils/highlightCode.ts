import * as Prism from './languages';

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
