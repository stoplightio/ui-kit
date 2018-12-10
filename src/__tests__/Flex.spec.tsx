/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';

import { Box, Flex, IFlex } from '../';

describe('Flex component', () => {
  it('renders Box component', () => {
    const wrapper = shallow(<Flex />);
    expect(wrapper).toMatchElement(<Box />);
  });

  it('passes all custom props', () => {
    const props: IFlex = {
      as: 'h3',
      children: 'example',
      test: 2,
    };

    const wrapper = shallow(<Flex {...props} />);
    expect(wrapper).toHaveProp(props);
  });

  describe('styles', () => {
    it('sets display flex', () => {
      const wrapper = shallow(<Flex />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ display: 'flex' }]));
    });

    it.each(['flexBasis', 'flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'alignItems'])(
      'sets a %s rule',
      (rule: string) => {
        const wrapper = shallow(<Flex {...{ [rule]: 'value' }} />);
        expect(wrapper).toHaveProp('css', expect.arrayContaining([{ [rule]: 'value' }]));
      }
    );
  });
});
