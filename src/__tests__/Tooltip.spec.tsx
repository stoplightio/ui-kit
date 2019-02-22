import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
// import { Box } from '../Box';
import { useTheme } from '../theme';
import { Caret, Tooltip } from '../Tooltip';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    tooltip: {
      fg: 'black',
      bg: 'yellow',
      border: 'green',
      invalidFg: 'red',
      invalidBg: 'pink',
      invalidBorder: 'red',
    },
  }),
}));

describe('Tooltip component', () => {
  it('renders Tooltip contents', () => {
    const wrapper = mount(
      <Tooltip>
        <div>Hello</div>
      </Tooltip>
    );
    expect(wrapper.containsAnyMatchingElements([<div>Hello</div>])).toBeTruthy();
  });

  describe('positions caret based on props', () => {
    it('default (top left)', () => {
      const wrapper = mount(<Tooltip />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', '12px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('bottom', '-1px');
    });

    it('top left', () => {
      const wrapper = mount(<Tooltip posY="top" posX="left" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', '12px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('bottom', '-1px');
    });
    it('top center', () => {
      const wrapper = mount(<Tooltip posY="top" posX="center" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', 'calc(50% - 8.485281374238571px)');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('bottom', '-7px');
    });
    it('top right', () => {
      const wrapper = mount(<Tooltip posY="top" posX="right" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('right', '12px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('bottom', '-1px');
    });

    it('center left', () => {
      const wrapper = mount(<Tooltip posY="center" posX="left" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('right', '-9.485281374238571px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('top', '50%');
    });
    it('center center', () => {
      const wrapper = mount(<Tooltip posY="center" posX="center" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('visibility', 'hidden');
    });
    it('center right', () => {
      const wrapper = mount(<Tooltip posY="center" posX="right" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', '-9.485281374238571px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('top', '50%');
    });

    it('bottom left', () => {
      const wrapper = mount(<Tooltip posY="bottom" posX="left" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', '12px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('top', '-1px');
    });
    it('bottom center', () => {
      const wrapper = mount(<Tooltip posY="bottom" posX="center" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('left', 'calc(50% - 8.485281374238571px)');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('top', '-7px');
    });
    it('bottom right', () => {
      const wrapper = mount(<Tooltip posY="bottom" posX="right" />);
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('right', '12px');
      expect(wrapper.find(Caret).childAt(0)).toHaveStyle('top', '-1px');
    });
  });

  describe('styles', () => {
    it('provides a default styling based on theme', () => {
      const wrapper = mount(<Tooltip />);
      const theme = useTheme();
      expect(wrapper.childAt(0)).toHaveProp('css');
      expect(wrapper.childAt(0).prop('css')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: theme.tooltip!.fg }),
          expect.objectContaining({ backgroundColor: theme.tooltip!.bg }),
        ])
      );
    });
    it('uses "invalid" styling if "invalid" prop is applied', () => {
      const wrapper = mount(<Tooltip invalid={true} />);
      const theme = useTheme();
      expect(wrapper.childAt(0)).toHaveProp('css');
      expect(wrapper.childAt(0).prop('css')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: theme.tooltip!.invalidFg }),
          expect.objectContaining({ backgroundColor: theme.tooltip!.invalidBg }),
        ])
      );
    });
  });
});
