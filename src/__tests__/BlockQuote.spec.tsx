import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { BlockQuote } from '../BlockQuote';
import { IBoxProps } from '../Box';

describe('BlockQuote', () => {
  it('renders content', () => {
    const content = 'foo';
    const wrapper = shallow(<BlockQuote>{content}</BlockQuote>);
    expect(wrapper).toHaveText(content);
  });

  it('attaches custom attributes', () => {
    const attributes: IBoxProps = {
      border: 'lg',
      pl: 'xl',
    };

    const wrapper = shallow(<BlockQuote attributes={attributes}>stoplight.io</BlockQuote>);
    expect(wrapper).toHaveProp(attributes);
  });
});
