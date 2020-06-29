import 'jest-enzyme';

import { mount } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import CodeViewer from '../CodeViewer';
import { astToReact } from '../utils/astToReact';
import CodeWorker from '../worker';

jest.mock('../utils/astToReact');
jest.mock('../worker/', () => {
  const W = new (class implements Worker {
    postMessage = jest.fn();
    terminate = jest.fn();

    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    dispatchEvent = jest.fn();

    onmessage = null;
    onerror = null;
  })();

  return {
    default: class {
      constructor() {
        return W;
      }
    },
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

    const wrapper = mount(<CodeViewer language={language} value={code} inline />);
    expect(wrapper).toHaveText(code);
    expect(wrapper.getDOMNode()).toHaveProperty('tagName', 'CODE');

    expect(codeWorker.postMessage).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('renders pre element for block view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = mount(<CodeViewer language={language} value={code} />);
    expect(wrapper.getDOMNode()).toHaveProperty('tagName', 'PRE');

    wrapper.unmount();
  });

  it('renders code as is if parsing fails', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = mount(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveText(code);

    expect(codeWorker.postMessage).toHaveBeenCalledWith({
      code,
      language,
      showLineNumbers: true,
    });

    act(() => {
      codeWorker.onmessage!({
        data: {
          error: 'error',
          nodes: null,
        },
      } as any);
    });

    wrapper.unmount();
  });

  it('does not try to map ast nodes to react nodes if parsing failed', () => {
    const wrapper = mount(<CodeViewer language="javascript" value="foo()" />);

    expect(astToReact).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('renders parsed markup if possible', () => {
    const code = 'function';
    const language = 'javascript';
    const nodes = [
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['token', 'function'],
        },
        value: 'function',
      },
    ];
    const markup = <span className="token function">function</span>;

    const wrapper = mount(<CodeViewer language={language} value={code} />);

    (astToReact as jest.Mock).mockReturnValue(() => markup);

    act(() => {
      codeWorker.onmessage!({
        data: {
          error: null,
          nodes,
        },
      } as any);
    });

    expect(codeWorker.postMessage).toHaveBeenCalledWith({
      code,
      language,
      showLineNumbers: true,
    });

    expect(astToReact).toHaveBeenCalled();

    wrapper.unmount();
  });
});
