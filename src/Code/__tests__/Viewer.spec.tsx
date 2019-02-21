import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { astToReact } from '../utils/astToReact';
import { parseCode } from '../utils/parseCode';
import { Viewer } from '../Viewer';

jest.mock('../utils/astToReact');
jest.mock('../utils/parseCode');
jest.mock('../styles');

describe('Code Viewer component', () => {
  afterEach(() => {
    (parseCode as jest.Mock).mockReset();
    (astToReact as jest.Mock).mockReset();
  });

  it('renders code element with raw value for inline view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<Viewer language={language} value={code} inline />);
    expect(wrapper).toHaveText(code);
    expect(wrapper).toHaveProp('as', 'code');

    expect(parseCode).not.toHaveBeenCalled();
  });

  it('renders pre element for block view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<Viewer language={language} value={code} />);
    expect(wrapper).toHaveProp('as', 'pre');
  });

  it('renders code as is if parsing fails', () => {
    const code = '{}';
    const language = 'json';
    (parseCode as jest.Mock).mockReturnValue(null);

    const wrapper = shallow(<Viewer language={language} value={code} />);
    expect(wrapper).toHaveText(code);

    expect(parseCode).toHaveBeenCalledWith(code, language, false);
  });

  it('does not try to map ast nodes to react nodes if parsing failed', () => {
    (parseCode as jest.Mock).mockReturnValue(null);
    shallow(<Viewer language="javascript" value="foo()" />);

    expect(astToReact).not.toHaveBeenCalled();
  });

  it('renders parsed markup if possible', () => {
    const code = 'function';
    const language = 'javascript';
    const ast = [
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

    (parseCode as jest.Mock).mockReturnValue(ast);
    (astToReact as jest.Mock).mockReturnValue(() => markup);

    const wrapper = shallow(<Viewer language={language} value={code} />);
    expect(wrapper).toContainReact(markup);
    expect(parseCode).toHaveBeenCalledWith(code, language, false);
    expect(astToReact).toHaveBeenCalled();
  });
});
