import * as React from 'react';
import { EventCallback } from 'publisher-subscriber-pattern';

export interface ContextProps {
  eventSubscribersCount(eventName: string): number,
  subscribe(
    eventName: string,
    eventCallback: EventCallback,
    subscriberInstance?: Record<string, unknown>
  ): void,
  subscribersCount(): number,
  unsubscribeAll(): void,
};

export const defaultProps: ContextProps = {
  eventSubscribersCount: () => 0,
  subscribe: () => {},
  subscribersCount: () => 0,
  unsubscribeAll: () => {},
};

export const { Consumer, Provider } = React.createContext<ContextProps>(defaultProps);
