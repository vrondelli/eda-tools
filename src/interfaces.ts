import { EventType, IEventHandler } from './types';
import { Container, interfaces } from 'inversify';

export interface IEventBus {
  subscribe(event: EventType, handler: IEventHandler): void;
  unsubscribe(event: EventType, handler: IEventHandler): void;
  publish(event: EventType, message?: any): void;
  subscribeAll(events: EventType[], handlerClassInstance: object): void;
  getEventHandlers(event: EventType): IEventHandler[];
}

export interface IMessageTransport {
  /**
   * Subscribes to a topic and receive all messages on that topic
   */
  subscribe(topic: string, handler: IEventHandler): void;

  /**
   * Unsubscribe a handler of a topic 
   */
  unsubscribe(topic: string, handler: IEventHandler): void;

  /**
   * Publishes a message to all subscribers
   */
  publish(topic: string, message: any): void;

  /**
   * Get All handlers of a topic
   */
  getHandlers(topic: string): IEventHandler[];
}

export interface IModuleOptions {
  transport?: IMessageTransport,
  container?: Container,
  containerOptions?: interfaces.ContainerOptions
}
