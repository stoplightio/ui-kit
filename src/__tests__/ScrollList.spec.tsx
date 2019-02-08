import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { FixedSizeList as WindowFixedSizeList, VariableSizeList as WindowVariableSizeList } from 'react-window';

describe('FixedSizeList component', () => {
  let FixedSizeList: React.FunctionComponent<any>;
  let AutoSizer: jest.Mock;

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue({
        scrollbar: {},
      }),
    }));

    jest.mock('../AutoSizer');
    jest.mock('../Box');

    // @ts-ignore
    ({ AutoSizer } = await import('../AutoSizer'));

    AutoSizer.mockImplementation(({ width, height, children }) => children({ width, height }));

    ({ FixedSizeList } = await import('../ScrollList'));
  });

  afterAll(() => {
    jest.unmock('../theme');
    jest.unmock('../AutoSizer');
    jest.unmock('../Box');
  });

  it('should pass height and width to AutoSizer', () => {
    const dimensions = {
      width: '80%',
      height: 40,
    };

    shallow(<FixedSizeList {...dimensions} />).dive();

    expect(AutoSizer).toHaveBeenCalledWith(expect.objectContaining(dimensions), expect.anything());
  });

  it('should render WindowFixedSizeList', () => {
    const wrapper = mount(
      <FixedSizeList width="100%" height="100%">
        abc
      </FixedSizeList>
    );

    expect(wrapper.find(WindowFixedSizeList)).toExist();
    wrapper.unmount();
  });

  it('should pass computed width and height to WindowFixedSizeList', () => {
    const dimensions = {
      width: '241px',
      height: '92px',
    };

    AutoSizer.mockImplementation(({ children }) => children(dimensions));
    const wrapper = shallow(<FixedSizeList width="100%" height="100%" />).dive();

    expect(wrapper).toHaveProp(dimensions);
  });

  it('should pass all other properties to WindowFixedSizeList', () => {
    const props = {
      itemSize: 20,
      itemCount: 100,
    };

    const wrapper = shallow(<FixedSizeList width="100%" height="100%" {...props} />).dive();

    expect(wrapper).toHaveProp(props);
  });
});

describe('VariableSizeList component', () => {
  let VariableSizeList: React.FunctionComponent<any>;
  let AutoSizer: jest.Mock;

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue({
        scrollbar: {},
      }),
    }));

    jest.mock('../AutoSizer');

    // @ts-ignore
    ({ AutoSizer } = await import('../AutoSizer'));
    AutoSizer.mockImplementation(({ width, height, children }) => children({ width, height }));

    ({ VariableSizeList } = await import('../ScrollList'));
  });

  afterAll(() => {
    jest.unmock('../theme');
    jest.unmock('../AutoSizer');
  });

  it('should pass height and width to AutoSizer', () => {
    const dimensions = {
      width: '80%',
      height: 40,
    };

    shallow(<VariableSizeList {...dimensions} />).dive();

    expect(AutoSizer).toHaveBeenCalledWith(expect.objectContaining(dimensions), expect.anything());
  });

  it('should render WindowVariableSizeList', () => {
    const wrapper = mount(
      <VariableSizeList width="100%" height="100%">
        abc
      </VariableSizeList>
    );

    expect(wrapper.find(WindowVariableSizeList)).toExist();
    wrapper.unmount();
  });

  it('should pass computed width and height to WindowVariableSizeList', () => {
    const dimensions = {
      width: '241px',
      height: '92px',
    };

    AutoSizer.mockImplementation(({ children }) => children(dimensions));
    const wrapper = shallow(<VariableSizeList width="100%" height="100%" />).dive();

    expect(wrapper).toHaveProp(dimensions);
  });

  it('should pass all other properties to WindowVariableSizeList', () => {
    const props = {
      itemSize: 20,
      itemCount: 100,
    };

    const wrapper = shallow(<VariableSizeList width="100%" height="100%" {...props} />).dive();

    expect(wrapper).toHaveProp(props);
  });
});
