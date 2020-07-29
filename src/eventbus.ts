import 'reflect-metadata';
import { injectable } from 'inversify';

import { IEventBus, IMessageTransport } from './interfaces';
import { EventType, IEventHandler, isEventString } from './types';
import { IEvent } from './iEvent';
import { Handle } from './handle';
import { Type } from '@cashfarm/lang';

@injectable()
export class EventBus implements IEventBus {
  constructor(private transport: IMessageTransport) { }

  public subscribe(event: EventType, handler: IEventHandler): void {
    const eventName = this.getEventName(event);

    this.transport.subscribe(eventName, handler)
  }

  public subscribeAll(events: EventType[], handlerClassInstance: object): void {
    events.forEach(event => {
      const handler = handlerClassInstance[Handle(event)].bind(handlerClassInstance);

      if (typeof handler !== 'function') {
        throw new Error(`Can't subscribe ${handlerClassInstance.constructor.name} to ${this.getEventName(event)}` +
          'because it has not defined a method')
      }

      this.subscribe(event, handler)
    });
  }

  public unsubscribe(event: EventType, handler: IEventHandler): void {
    return this.transport.unsubscribe(this.getEventName(event), handler);
  }

  public publish(event: EventType, message?: any): void {
    if (isEventString(event)) return this.transport.publish(<string>event, message);

    const eventName = (<IEvent>event).constructor.name;

    this.transport.publish(eventName, event);
  }

  public getEventHandlers(event: EventType): IEventHandler[] {
    const eventName = this.getEventName(event);

    return this.transport.getHandlers(eventName);
  }

  private getEventName(event: EventType) {
    return isEventString(event) ? event as string : (<IEvent & Type>event).name;
  }
}
