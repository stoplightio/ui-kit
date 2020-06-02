import * as refractor from 'refractor/core';
import '../../CodeEditor/utils/languages';
import { lineNumberify } from './lineNumberify';

function parsePlainText(code: string) {
  return code.split('\n').map((value, i, arr) => ({
    type: 'element',
    tagName: 'span',
    properties: {},
    children: [
      {
        type: 'text',
        value: arr.length - 1 === i ? value : `${value}\n`,
      },
    ],
  }));
}

function safeParse(code: string, language?: string) {
  if (language) {
    try {
      return refractor.highlight(code, language);
    } catch (ex) {
      // let's fallback to plain text
    }
  }

  return parsePlainText(code);
}

export function parseCode(code: string, language?: string, addLineNumbers?: boolean) {
  try {
    const ast = safeParse(code, language);
    if (addLineNumbers) {
      return lineNumberify(ast);
    }

    return ast;
  } catch (ex) {
    return null;
  }
}
