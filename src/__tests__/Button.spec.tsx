import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    button: {
      fg: '#000',
      bg: '#fff',
      hoverBg: '0 2px 5px #000',
    },
  }),
}));

describe('Button component', () => {
  it('renders Flex as button', () => {
    const wrapper = shallow(<Button />).shallow();
    expect(wrapper).toMatchElement(<Flex as="button" />);
  });

  it('can render any tag', () => {
    const as = 'h3';
    const wrapper = shallow(<Button as={as} />);
    expect(wrapper).toHaveProp({ as });
  });

  it('passes disabled to Box', () => {
    const wrapper = shallow(<Button disabled />);
    expect(wrapper).toHaveProp('disabled', true);
  });
});
