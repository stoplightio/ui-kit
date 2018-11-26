import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { IBoxProps } from '../Box';
import { ILinkProps, Link } from '../Link';

describe('Links', () => {
  let props: ILinkProps;

  beforeEach(() => {
    props = {
      children: '',
      title: 'Stoplight.io',
      href: 'www.stoplight.io',
    };
  });

  it('renders content', () => {
    const content = 'foo';
    const wrapper = shallow(<Link {...props}>{content}</Link>);
    expect(wrapper).toHaveText(content);
  });

  it('attaches title', () => {
    const wrapper = shallow(<Link {...props}>stoplight.io</Link>);
    expect(wrapper).toHaveProp('title', props.title);
  });

  it('attaches href', () => {
    const wrapper = shallow(<Link {...props}>stoplight.io</Link>);
    expect(wrapper).toHaveProp('href', props.href);
  });

  it('attaches custom attributes', () => {
    const attributes: IBoxProps = {
      border: '@lg',
      pl: '@xl',
    };

    const wrapper = shallow(
      <Link {...props} attributes={attributes}>
        stoplight.io
      </Link>
    );
    expect(wrapper).toHaveProp(attributes);
  });
});
