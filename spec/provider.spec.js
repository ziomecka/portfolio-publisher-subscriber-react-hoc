import {
  buildWrapper,
  getComponentProps,
} from './stubs/builders';
import { Component } from './stubs/component.stub';
import { window } from './stubs/window.stub';

describe('PublisherProvider', () => {
  let componentProps;

  beforeEach(() => {
    componentProps = getComponentProps(Component);

    global.subscribeCallback = () => {};
    spyOn(global, 'subscribeCallback');
  });

  afterEach(() => {
    window.removeAllListeners('click');
    window.removeAllListeners('scroll');
  });

  it('subscribes to emitter\'s event only once', () => {
    // given
    const { subscribe } = componentProps;

    // when
    subscribe('click', subscribeCallback);
    subscribe('click', subscribeCallback);
    window.emit('click');

    // then
    expect(window.listenerCount('click')).toBe(1);
    expect(subscribeCallback).toBeCalledTimes(2);
  });

  it('unsubscribes from emitter\'s events before unmounting', () => {
    // given
    const wrapper = buildWrapper(Component);
    const { subscribe } = getComponentProps(Component, wrapper);

    // when
    subscribe('click', subscribeCallback);
    subscribe('scroll', subscribeCallback);
    wrapper.unmount();
    window.emit('click');

    // then
    expect(window.listenerCount('click')).toBe(0);
    expect(window.listenerCount('scroll')).toBe(0);
    expect(subscribeCallback).toBeCalledTimes(0);
  });
});
