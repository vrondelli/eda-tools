import { EventType, IEventHandler } from '../../src';

const subscribeAll = (events: EventType[], handlerClassInstance: object) => {
  handlerClassInstance["events"] = events;
};
const subscribe = (event: EventType, handler: IEventHandler) => { };
const unsubscribe = (event: EventType, handler: IEventHandler) => { };
const publish = (event: EventType, message?: any) => { };

export const eventbus = {
  subscribeAll,
  subscribe,
  unsubscribe,
  publish,
  transport: {},
  getEventName: () => { },
};
