import * as React from 'react';
import {
  ContextProps,
  Provider,
} from './context';
import {
  EmitterInstance,
  Publisher,
} from 'publisher-subscriber-pattern';

export interface PublisherProviderProps {
  emitter: EmitterInstance;
  addListenerMethodName: string;
  removeListenerMethodName: string;
};

export class PublisherProvider extends React.PureComponent<PublisherProviderProps> {
  private publisher: Publisher;
  private provider: React.Provider<ContextProps>;
  constructor (props: PublisherProviderProps) {
    super(props);
    this.publisher =
      new Publisher(props.emitter, props.addListenerMethodName, props.removeListenerMethodName);
  }

  public componentWillUnmount (): void {
    this.publisher.unsubscribeAll();
  }

  public render (): JSX.Element {
    const {
      publisher: {
        eventSubscribersCount,
        subscribe,
        subscribersCount,
        unsubscribeAll,
      },
    } = this;

    return (
      <Provider value={{ subscribersCount, eventSubscribersCount, subscribe, unsubscribeAll }}>
        {this.props.children}
      </Provider>
    );
  }
}
