import * as React from 'react';
import {
  Consumer,
  defaultProps
} from './context';
import { EventCallback } from 'publisher-subscriber-pattern';

export interface WithPublisherProps {
  eventSubscribersCount?: (eventName: string) => number;
  subscribe?: (eventName: string, eventCallback: EventCallback) => () => void;
  subscribersCount?: () => number;
  unsubscribeAll?: () => void;
};

export const withPublisher = <P extends object>(Component: React.ComponentType<P>) => (
  (props: P & WithPublisherProps): JSX.Element => {
    return (
      <Consumer>{({
        eventSubscribersCount,
        subscribe,
        subscribersCount,
        unsubscribeAll
      } = defaultProps): JSX.Element => (
        <Component
          { ...props }
          {...{ eventSubscribersCount, subscribe, subscribersCount, unsubscribeAll }}
        />
      )}
      </Consumer>
    );
  }
);
