// @ts-ignore
import * as refractor from 'refractor';
import { parseCode } from '../parseCode';

jest.mock('refractor');

describe('parseCode util', () => {
  afterEach(() => {
    refractor.highlight.mockReset();
  });

  it('returns null if language is falsy', () => {
    expect(parseCode('')).toBeNull();
  });

  it('calls refractor.highlight and returns its result', () => {
    const code = 'foo()';
    const language = 'javscript';
    const result = { type: 'element', tagName: 'span', children: [], properties: {} };
    refractor.highlight.mockReturnValue(result);

    expect(parseCode(code, language)).toBe(result);
    expect(refractor.highlight).toHaveBeenCalledWith(code, language);
  });

  it('returns null if parsing fails', () => {
    const code = 'foo()';
    const language = 'javscript';
    refractor.highlight.mockImplementation(() => {
      throw new Error();
    });

    expect(parseCode(code, language)).toBeNull();
    expect(refractor.highlight).toHaveBeenCalledWith(code, language);
  });
});
