import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { ListScroller } from '../ListScroller';

describe('ListScroller', () => {
  it('calls rowRenderer', () => {
    const list = ['stoplight.io', 'api'];
    const rowHeight = 20;
    const rowRenderer = jest.fn(() => <div />);

    // @ts-ignore
    AutoSizer.mockImplementation(({ children: render }) => render({ height: 50, width: 100 }));

    const wrapper = mount(<ListScroller rowHeight={rowHeight} rowRenderer={rowRenderer} list={list} />);

    expect(rowRenderer).toHaveBeenCalledWith({
      index: 0,
      key: '0-0',
      style: expect.objectContaining({
        height: rowHeight,
      }),
      value: list[0],
    });

    expect(rowRenderer).toHaveBeenLastCalledWith({
      index: 1,
      key: '1-0',
      style: expect.objectContaining({
        height: rowHeight,
      }),
      value: list[1],
    });

    wrapper.unmount();
  });
});
