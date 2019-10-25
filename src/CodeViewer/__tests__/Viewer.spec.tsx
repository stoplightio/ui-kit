import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { CodeViewer } from '..';

describe('Code Viewer component', () => {
  it('renders code element with raw value for inline view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<CodeViewer language={language} value={code} inline />);
    expect(wrapper).toHaveText(code);
    expect(wrapper).toHaveDisplayName('code');
  });

  it('renders pre element for block view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = shallow(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveDisplayName('pre');
  });

  it('renders parsed markup if possible', () => {
    const code = 'function';
    const language = 'javascript';
    const html = `<pre class="bp3-code-editor language-javascript"><span class="token keyword">function</span></pre>`;

    const wrapper = shallow(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveHTML(html);
  });
});
