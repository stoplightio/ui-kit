import 'jest-enzyme';

import { shallow } from 'enzyme';
import * as React from 'react';
import CodeWorker from 'worker-loader!../worker/index.ts';

import { CodeViewer } from '../index';
import { astToReact } from '../utils/astToReact';

jest.mock('../utils/astToReact');
jest.mock('../worker/', () => {
  const postMessage = jest.fn();
  const terminate = jest.fn();
  class W implements Worker {
    postMessage = postMessage;
    terminate = terminate;

    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    dispatchEvent = jest.fn();

    onmessage = null;
    onerror = null;
  }

  return {
    default: W,
  };
});

describe('Code Viewer component', () => {
  let codeWorker: Worker;

  beforeEach(() => {
    codeWorker = new CodeWorker();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders code element with raw value for inline view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<CodeViewer language={language} value={code} inline />);
    expect(wrapper).toHaveText(code);
    expect(wrapper).toHaveDisplayName('code');

    expect(codeWorker.postMessage).not.toHaveBeenCalled();
  });

  it('renders pre element for block view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveDisplayName('pre');
  });

  it('renders code as is if parsing fails', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveText(code);

    expect(codeWorker.postMessage).toHaveBeenCalledWith(code, language, false);
  });

  it('does not try to map ast nodes to react nodes if parsing failed', () => {
    shallow(<CodeViewer language="javascript" value="foo()" />);

    expect(astToReact).not.toHaveBeenCalled();
  });

  it('renders parsed markup if possible', () => {
    const code = 'function';
    const language = 'javascript';
    // const ast = [
    //   {
    //     type: 'element',
    //     tagName: 'span',
    //     properties: {
    //       className: ['token', 'function'],
    //     },
    //     value: 'function',
    //   },
    // ];
    const markup = <span className="token function">function</span>;

    // (parseCode as jest.Mock).mockReturnValue(ast);
    (astToReact as jest.Mock).mockReturnValue(() => markup);

    const wrapper = shallow(<CodeViewer language={language} value={code} />);
    expect(wrapper).toContainReact(markup);
    // expect(parseCode).toHaveBeenCalledWith(code, language, false);
    expect(astToReact).toHaveBeenCalled();
  });
});
