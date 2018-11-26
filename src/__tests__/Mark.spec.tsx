import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { IBoxProps } from '../Box';
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

  it('attaches custom attributes', () => {
    const attributes: IBoxProps = {
      border: 'lg',
      pl: 'xl',
    };

    const wrapper = shallow(
      <Mark mark={{ type: 'strong' }} attributes={attributes}>
        stoplight.io
      </Mark>
    );
    expect(wrapper).toHaveProp(attributes);
  });
});
