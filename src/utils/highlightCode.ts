import { highlight, languages } from 'prismjs';

export const highlightCode = (code: string, language: string) => {
  const langDef = languages[language];
  return langDef ? highlight(code, langDef) : code;
};
