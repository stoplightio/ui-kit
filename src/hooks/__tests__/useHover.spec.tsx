import 'jest-enzyme';
import * as React from 'react';

describe('useHover hook', () => {
  let useEffectSpy: jest.SpyInstance;
  let useStateSpy: jest.SpyInstance;
  let setStateSpy: jest.MockInstance<boolean, any>;
  let useHover: Function;

  beforeAll(async () => {
    jest.useFakeTimers();
    useEffectSpy = jest.spyOn(React, 'useEffect').mockReturnValue(void 0);
    setStateSpy = jest.fn();
    useStateSpy = jest.spyOn<any, string>(React, 'useState').mockReturnValue([false, setStateSpy]);
    ({ useHover } = await import('../useHover'));
  });

  afterEach(() => {
    useEffectSpy.mockClear();
    setStateSpy.mockClear();
    useStateSpy.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
    useEffectSpy.mockRestore();
    useStateSpy.mockRestore();
  });

  it('uses initial state', () => {
    useHover(true, null);
    expect(useStateSpy).toHaveBeenCalledWith(true);
    useHover(false, null);
    expect(useStateSpy).toHaveBeenLastCalledWith(false);
  });

  it('propagates mouseenter event', () => {
    const onMouseEnter = jest.fn();
    const [, handlers] = useHover(false, { onMouseEnter });
    const event = new MouseEvent('mouseenter');

    handlers.onMouseEnter(event);

    expect(onMouseEnter).toHaveBeenCalledWith(event);
  });

  it('propagates mouseleave event', () => {
    const onMouseLeave = jest.fn();
    const [, handlers] = useHover(false, { onMouseLeave });
    const event = new MouseEvent('mouseenter');

    handlers.onMouseLeave(event);

    expect(onMouseLeave).toHaveBeenCalledWith(event);
  });

  it('ignores timeouts by default', () => {
    const [, handlers] = useHover(false, {});
    handlers.onMouseLeave({});

    expect(clearTimeout).not.toHaveBeenCalled();
  });

  it('listens to lifecycle events', () => {
    useHover(false, {});

    expect(useEffectSpy).toHaveBeenCalledWith(expect.any(Function), [null]);
  });

  describe('when hideDelay is provided', () => {
    it('sets a timeout with given hideDelay upon mouseleave', () => {
      const hideDelay = 500;

      const [, handlers] = useHover(false, null, hideDelay);
      handlers.onMouseLeave({});

      expect(setTimeout).toHaveBeenCalledWith(setStateSpy, hideDelay, false);
    });

    it('clears previously set timeout once on mouseenter event', () => {
      const timeout = 239829;
      (setTimeout as any).mockReturnValue(timeout);

      const [, handlers] = useHover(false, null, {});
      handlers.onMouseLeave({});
      handlers.onMouseEnter({});
      handlers.onMouseEnter({});

      expect(clearTimeout).toHaveBeenCalledWith(timeout);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });

    it('clears previously set timeout upon lifecycle hook', () => {
      const timeout = 239829;
      (setTimeout as any).mockReturnValue(timeout);

      const [, handlers] = useHover(false, null, {});
      handlers.onMouseLeave({});
      useEffectSpy.mock.calls[0][0]();

      expect(clearTimeout).toHaveBeenCalledWith(timeout);
    });
  });
});
