// @ts-ignore
import * as refractor from 'refractor';
import { lineNumberify } from './lineNumberify';

export function parseCode(code: string, language?: string, addLineNumbers?: boolean) {
  if (!language) return null;

  try {
    const ast = refractor.highlight(code, language);
    if (addLineNumbers) {
      return lineNumberify(ast);
    }

    return ast;
  } catch (ex) {
    return null;
  }
}
