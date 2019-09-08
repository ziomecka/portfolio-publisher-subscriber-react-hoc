import * as React from 'react';
import { withPublisher, PublisherProvider } from '../../src/';
import { mount } from 'enzyme';
import { window } from './window.stub';

export const providerProps = {
  emitter: window,
  addListenerMethodName: 'addListener',
  removeListenerMethodName: 'removeListener',
};

export const buildWrapper = (Component) => {
  const ComponentWithPublisher = withPublisher(Component);

  return mount(
    <PublisherProvider { ...providerProps }>
      <ComponentWithPublisher />
    </PublisherProvider>
  );
};

export const getComponentProps = (Component, wrapper) => {
  return (wrapper || buildWrapper(Component)).find(Component).props();
};