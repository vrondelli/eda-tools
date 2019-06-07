import { EventEmitter } from 'events';
import { IMessageTransport } from './interfaces';
import { IEventHandler } from './types';

export class Transport extends EventEmitter implements IMessageTransport {
  public subscribe(topic: string, handler: IEventHandler) {
    this.on(topic, handler);
  }

  public unsubscribe(topic: string, handler: IEventHandler): void {
    this.removeListener(topic, handler);
  }

  public publish(topic: string, message: any): void {
    this.emit(topic, message);
  }
}
