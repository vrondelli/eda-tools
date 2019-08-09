import 'reflect-metadata';
import { ConcreteType } from '@cashfarm/lang';
import { EventType } from './types';
import { EVENTS_HANDLER_METADATA } from './constants';

export function EventHandler(...events: EventType[]) {
  return function (target: ConcreteType<any>) {
    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  }
}
