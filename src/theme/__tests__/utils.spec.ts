describe('colorMixin', () => {
  let colorMixin: Function;

  const theme = {
    container: {
      fg: 'red',
      bg: 'green',
      border: 'white',
      hoverFg: 'blue',
      focusFg: '#111',
      focusBg: '#222',
      focusBorder: '#333',
    },
  };

  beforeAll(async () => {
    jest.mock('../', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ colorMixin } = await import('../utils'));
  });

  afterAll(() => {
    jest.unmock('../');
  });

  it('skips non-object values', () => {
    expect(colorMixin('hover', 'foo')).toBeNull();
  });

  it('handles non-state case', () => {
    expect(colorMixin('', 'container')).toEqual({
      color: 'red',
      backgroundColor: 'green',
      borderColor: 'white',
    });
  });

  it('handles state', () => {
    expect(colorMixin('focus', 'container')).toEqual({
      ':focus': {
        color: '#111',
        backgroundColor: '#222',
        borderColor: '#333',
      },
    });
  });

  it('picks only truthy values based on state', () => {
    expect(colorMixin('hover', 'container')).toEqual({
      ':hover': {
        color: 'blue',
      },
    });
  });
});
