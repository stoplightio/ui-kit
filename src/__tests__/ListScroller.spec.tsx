/**
 * @jest-environment jsdom
 */
import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { List } from 'react-virtualized';
import { ListScroller } from '../ListScroller';

describe('ListScroller', () => {
  it('maps listHeight and listWidth', () => {
    const listHeight = 40;
    const listWidth = 50;

    const wrapper = mount(
      <ListScroller listHeight={listHeight} rowHeight={20} listWidth={listWidth} renderRow={() => <div />} list={[]} />
    );

    expect(wrapper.find(List)).toHaveProp({
      height: listHeight,
      width: listWidth,
    });

    wrapper.unmount();
  });
});
