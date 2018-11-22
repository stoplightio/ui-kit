import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { BlockQuote } from '../BlockQuote';

describe('BlockQuote', () => {
  it('renders content', () => {
    const content = 'foo';
    const wrapper = mount(<BlockQuote>{content}</BlockQuote>);
    expect(wrapper).toHaveText(content);
    wrapper.unmount();
  });
});
