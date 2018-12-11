/* @jsx jsx */

import { jsx } from '@emotion/core';

import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';

import { IScrollList } from '../ScrollList';

// fixme: enabled the test
describe('ScrollList', () => {
  let useStateSpy: jest.SpyInstance;
  let ScrollList: React.FunctionComponent<IScrollList>;

  beforeAll(async () => {
    useStateSpy = jest.spyOn(React, 'useState').mockReturnValue([{}, jest.fn()]);

    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue({
        box: {},
        scrollbar: {},
      }),
    }));

    ({ ScrollList } = await import('../ScrollList'));
  });

  afterAll(() => {
    useStateSpy.mockReset();
    jest.unmock('../theme');
  });

  it('calls rowRenderer', () => {
    const list = ['stoplight.io', 'api'];
    const rowHeight = 20;
    const rowRenderer = jest.fn(() => null);

    // @ts-ignore
    AutoSizer.mockImplementation(({ children: render }) => render({ height: 50, width: 100 }));

    const wrapper = mount(<ScrollList rowHeight={rowHeight} rowRenderer={rowRenderer} list={list} />);

    // there was a memory leak when using toHaveBeenCalledWith
    expect(rowRenderer.mock.calls[0][0]).toMatchObject({
      index: 0,
      key: '0-0',
      isScrolling: false,
      isVisible: true,
      style: expect.objectContaining({
        height: rowHeight,
      }),
      value: list[0],
    });

    expect(rowRenderer.mock.calls[1][0]).toMatchObject({
      index: 1,
      key: '1-0',
      isScrolling: false,
      isVisible: true,
      style: expect.objectContaining({
        height: rowHeight,
      }),
      value: list[1],
    });

    wrapper.unmount();
  });
});
