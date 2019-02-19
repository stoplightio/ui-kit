// @ts-ignore
import * as refractor from 'refractor';

export function parseCode(code: string, language?: string) {
  if (!language) return null;

  try {
    return refractor.highlight(code, language);
  } catch (ex) {
    return null;
  }
}
