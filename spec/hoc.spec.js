import { Component } from './stubs/component.stub';
import { getComponentProps } from './stubs/builders';
import { window } from './stubs/window.stub';

describe('Component wrapped with withPublisher', () => {
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

  it('has props: eventSubscribersCount, subscribe, subscribersCount, unsubscribeAll', () => {
    // given
    const { eventSubscribersCount, subscribe, subscribersCount, unsubscribeAll } = componentProps;

    // then
    expect(typeof eventSubscribersCount).toBe('function');
    expect(typeof subscribe).toBe('function');
    expect(typeof subscribersCount).toBe('function');
    expect(typeof unsubscribeAll).toBe('function');
  });

  it('gets eventSubscribersCount and subscribersCount', () => {
    // given
    const { eventSubscribersCount, subscribe, subscribersCount } = componentProps;

    // when
    subscribe('click', subscribeCallback);
    subscribe('scroll', subscribeCallback);
    expect(subscribersCount()).toBe(2);
    subscribe('click', subscribeCallback);

    // then
    expect(eventSubscribersCount('click')).toBe(2);
    expect(eventSubscribersCount('scroll')).toBe(1);
    expect(subscribersCount()).toBe(3);
  });

  it('subscribes to events', () => {
    // given
    const { subscribe } = componentProps;

    // when
    subscribe('click', subscribeCallback);
    subscribe('scroll', subscribeCallback);

    // then
    expect(window.listenerCount('click')).toBe(1);
    expect(window.listenerCount('scroll')).toBe(1);
    expect(subscribeCallback).toBeCalledTimes(0);
  });

  it('is informed about events', () => {
    // given
    const { subscribe } = componentProps;

    // when
    subscribe('click', subscribeCallback);
    window.emit('click');

    // then
    expect(subscribeCallback).toBeCalledTimes(1);
  });

  it('unsubscribes its listener', () => {
    // given
    const { subscribe, subscribersCount } = componentProps;

    // when
    const unsubscribeClick = subscribe('click', subscribeCallback);
    unsubscribeClick();
    window.emit('click');

    // then
    expect(window.listenerCount('click')).toBe(0);
    expect(subscribersCount()).toBe(0);
    expect(subscribeCallback).toBeCalledTimes(0);
  });

  it('unsubscribes all publisher\'s listeners', () => {
    // given
    const { subscribe, subscribersCount, unsubscribeAll } = componentProps;

    // when
    subscribe('click', subscribeCallback);
    subscribe('scroll', subscribeCallback);
    unsubscribeAll();
    window.emit('click');

    // then
    expect(window.listenerCount('click')).toBe(0);
    expect(window.listenerCount('scroll')).toBe(0);
    expect(subscribersCount()).toBe(0);
    expect(subscribeCallback).toBeCalledTimes(0);
  });
});
