import { EventType, isEventString } from './types';
import { IEvent } from './iEvent';
import { Type } from '@cashfarm/lang';

export function  Handle(event: EventType) {
  if (isEventString(event))return Symbol.for(<string>event);

  return Symbol.for((<IEvent & Type>event).prototype.constructor.name);
}
