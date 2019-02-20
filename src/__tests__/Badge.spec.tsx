import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Badge, BadgeVariant } from '../Badge';
import { Box } from '../Box';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    badge: { default: { fg: 'white', bg: 'black' } },
  }),
}));

describe('Badge component', () => {
  it('renders Box as span', () => {
    const wrapper = shallow(<Badge>test</Badge>).shallow();
    expect(wrapper).toMatchElement(<Box as="span">test</Box>);
  });

  describe('styles', () => {
    it('displays textual variant correctly', () => {
      const wrapper = shallow(<Badge variant={BadgeVariant.Textual}>test</Badge>);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ color: 'black', backgroundColor: 'transparent' }]));
    });

    it('displays pill variant correctly', () => {
      const wrapper = shallow(<Badge variant={BadgeVariant.Pill}>test</Badge>);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ color: 'white', backgroundColor: 'black' }]));
    });
  });
});
