// @ts-ignore
import * as refractor from 'refractor';
import { parseCode } from '../parseCode';

jest.mock('refractor');

describe('parseCode util', () => {
  afterEach(() => {
    refractor.highlight.mockReset();
  });

  it('produces basic AST of if language is falsy', () => {
    expect(parseCode('foo\nbar')).toEqual([
      {
        children: [
          {
            type: 'text',
            value: 'foo\n',
          },
        ],
        properties: {},
        tagName: 'span',
        type: 'element',
      },
      {
        children: [
          {
            type: 'text',
            value: 'bar',
          },
        ],
        properties: {},
        tagName: 'span',
        type: 'element',
      },
    ]);
  });

  it('produces basic AST even when both code and language are falsy', () => {
    expect(parseCode('')).toEqual([
      {
        children: [
          {
            type: 'text',
            value: '',
          },
        ],
        properties: {},
        tagName: 'span',
        type: 'element',
      },
    ]);
  });

  it('calls refractor.highlight and returns its result', () => {
    const code = 'foo()';
    const language = 'javscript';
    const result = { type: 'element', tagName: 'span', children: [], properties: {} };
    refractor.highlight.mockReturnValue(result);

    expect(parseCode(code, language)).toBe(result);
    expect(refractor.highlight).toHaveBeenCalledWith(code, language);
  });

  it('fall backs to plain text parsing if refractor highlighting fails', () => {
    const code = 'foo()';
    const language = 'javscript';
    refractor.highlight.mockImplementation(() => {
      throw new Error();
    });

    expect(parseCode(code, language)).toEqual([
      {
        children: [
          {
            type: 'text',
            value: code,
          },
        ],
        properties: {},
        tagName: 'span',
        type: 'element',
      },
    ]);
    expect(refractor.highlight).toHaveBeenCalledWith(code, language);
  });
});
