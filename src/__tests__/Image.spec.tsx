/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import { IBox } from '../Box';
import { IImage } from '../Image';
import { ITheme } from '../theme';

describe('Image component', () => {
  let Image: FunctionComponent<IImage>;
  let Box: FunctionComponent<IBox>;

  const theme: Partial<ITheme> = {
    box: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Image, Box } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders Box component', () => {
    const wrapper = shallow(<Image />);
    expect(wrapper).toMatchElement(<Box />);
  });

  it('passes all props but hidden and responsive', () => {
    const props = {
      alt: 'example',
      src: 'example.com',
      hidden: false,
      responsive: true,
    };

    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toHaveProp({
      alt: props.alt,
      src: props.src,
    });

    expect(wrapper).not.toHaveProp('hidden');
    expect(wrapper).not.toHaveProp('responsive');
  });

  it('always renders img', () => {
    const wrapper = shallow(<Image as="h3" />);
    expect(wrapper).toHaveProp('as', 'img');
  });

  describe('styles', () => {
    it('hides image when hidden is true', () => {
      const wrapper = shallow(<Image hidden />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ display: 'none' }]));
    });

    it('sets responsive dimension when responsive is true', () => {
      const wrapper = shallow(<Image responsive />);
      expect(wrapper).toHaveProp(
        'css',
        expect.arrayContaining([
          {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          },
        ])
      );
    });
  });
});
