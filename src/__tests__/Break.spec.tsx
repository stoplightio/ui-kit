/**
 * @jest-environment jsdom
 */
import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Break } from '../';

describe('Break', () => {
  // just a smoke test
  it('does not require any props', () => {
    expect(() => shallow(<Break />)).not.toThrow();
  });
});
