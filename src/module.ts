import 'reflect-metadata';
import { Container } from 'inversify';
import { ConcreteType } from '@cashfarm/lang';
import { IMessageTransport } from './interfaces';
import { EVENTS_HANDLER_METADATA } from './constants';
import { EventBus } from './eventbus';
import { Transport } from './transport';
import { EventType } from './types';

export function registryProviders(providers: ConcreteType<any>[], container: Container) {
  providers.forEach(provider => {
    container.bind(provider).to(provider);
  });
}

export function getEventHandlers(providers: ConcreteType<any>[]) {
  return providers.filter(provider => Reflect.hasMetadata(EVENTS_HANDLER_METADATA, provider));
}

export function registryEventHandlers(
  eventBus: EventBus,
  eventHandlers: ConcreteType<any>[],
  container: Container
) {
  eventHandlers.forEach(handler => {
    const instance = container.get<ConcreteType<any>>(handler);

    const events = <EventType[]>Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
    
    eventBus.subscribeAll(events, instance);
  });
}

export function createModule(
  providers: ConcreteType<any>[],
  transport?: IMessageTransport,
  container?: Container,
) {
  const moduleContainer = container || new Container();
  const moduletransport = transport || new Transport(); 

  registryProviders(providers, moduleContainer);

  const eventBus = new EventBus(moduletransport);
  moduleContainer.bind(EventBus).toConstantValue(eventBus);

  const eventHandlers = getEventHandlers(providers);

  registryEventHandlers(eventBus, eventHandlers, moduleContainer);

  return moduleContainer;
}
