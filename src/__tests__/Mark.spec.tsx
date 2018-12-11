/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';

import { Mark } from '../Mark';

describe('Mark', () => {
  it.each`
    type            | as
    ${'strong'}     | ${'strong'}
    ${'emphasis'}   | ${'em'}
    ${'delete'}     | ${'del'}
    ${'inlineCode'} | ${'code'}
  `('renders Box as $as', ({ type, as }) => {
    const wrapper = shallow(<Mark mark={{ type }}>stoplight</Mark>);
    expect(wrapper).toHaveProp('as', as);
  });

  it('renders nothing if mark is unknown', () => {
    const wrapper = shallow(<Mark mark={{}}>stoplight</Mark>);
    expect(wrapper).toBeEmptyRender();
  });

  it('attaches custom props', () => {
    const props = {
      border: '@lg',
      pl: '@xl',
    };

    const wrapper = shallow(
      <Mark mark={{ type: 'strong' }} {...props}>
        stoplight.io
      </Mark>
    );
    expect(wrapper).toHaveProp(props);
  });
});
