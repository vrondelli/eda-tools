import { IEvent } from './iEvent';

export type EventType = IEvent | string;

export const isEventString = (event: EventType) => typeof event === 'string';

export type IEventHandler = (message: any) => void;
