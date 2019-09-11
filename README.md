[![npm version](https://badge.fury.io/js/publisher-subscriber-react-hoc.svg)](https://badge.fury.io/js/publisher-subscriber-react-hoc)

---

# About

* Javascript implementation of publisher subscriber pattern for React (Higher-order-component)
* Can be used with various event emitters including browser's window object
* Provides **ProviderPublisher** and **withPublisher**

# Installation
```javascript
npm i publisher-subscriber-react-hoc
```

---

# API

## **PublisherProvider**
```javascript
interface PublisherProviderProps {
  emitter: Record<string | number | symbol, unknown>;;
  addListenerMethodName: string;
  removeListenerMethodName: string;
};
```
## **withPublisher**
```javascript
type EventCallback<P = {}> = (event: P & Event) => void;

interface WithPublisherProps {
  eventSubscribersCount(eventName: string): number;
  subscribe(eventName: string, eventCallback: EventCallback): () => void;
  subscribersCount(): number;
  unsubscribeAll(): void;
};
```

---

# Dependencies

## Dependencies
* publisher-subscriber-pattern@2.0.2
* react@16.x.x
* react-dom@16.x.x

## DevDependencies
* Typescript
* jest, enzyme
* Babel