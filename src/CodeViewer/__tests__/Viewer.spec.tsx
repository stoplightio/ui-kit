import 'jest-enzyme';

import { mount } from 'enzyme';
import * as React from 'react';

import { CodeViewer } from '..';

describe('Code Viewer component', () => {
  it('renders code element with raw value for inline view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = mount(<CodeViewer language={language} value={code} inline />);
    expect(wrapper).toHaveHTML(
      `<code class="bp3-code-editor isInline"><span class="token punctuation">{</span><span class="token punctuation">}</span></code>`,
    );
  });

  it('renders pre element for block view', () => {
    const code = '{}';
    const language = 'json';

    const wrapper = mount(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveHTML(
      `<pre class="bp3-code-editor language-json"><span class="token punctuation">{</span><span class="token punctuation">}</span></pre>`,
    );
  });

  it('renders parsed markup if possible', () => {
    const code = 'function';
    const language = 'javascript';
    const html = `<pre class="bp3-code-editor language-javascript"><span class="token keyword">function</span></pre>`;

    const wrapper = mount(<CodeViewer language={language} value={code} />);
    expect(wrapper).toHaveHTML(html);
  });
});
