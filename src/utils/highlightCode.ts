import { highlight, languages } from 'prismjs';

export const highlightCode = (code: string, language: string) => {
  return highlight(code, languages[language]);
};
