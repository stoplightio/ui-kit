import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Badge, BadgeVariant } from '../Badge';
import { Box } from '../Box';

describe('Badge component', () => {
  it('renders Box as span', () => {
    const wrapper = shallow(<Badge label="test" />).shallow();
    expect(wrapper).toMatchElement(<Box as="span">test</Box>);
  });

  describe('styles', () => {
    it('displays textual variant correctly', () => {
      const wrapper = shallow(<Badge variant={BadgeVariant.Textual} label="test" />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ color: '#dc3546', backgroundColor: 'transparent' }]));
    });

    it('displays pill variant correctly', () => {
      const wrapper = shallow(<Badge variant={BadgeVariant.Pill} label="test" />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ color: 'white', backgroundColor: '#dc3546' }]));
    });
  });
});
