import { Container } from 'inversify';
import {
  registryProviders,
  EventHandler,
  getEventHandlers,
  EventBus,
  Transport,
  registryEventHandlersInEventbus
} from '../src';
import { TestHandler, eventbus } from './fixtures';

describe("registryProviders()", () => {
  test("registry providers in a inversify container", () => {
    const container = new Container();

    const providers = [TestHandler];

    registryProviders(providers, container);

    const instance = container.get<TestHandler>(TestHandler);

    expect(instance).toBeInstanceOf(TestHandler);
  });
});

describe("getEventHandlers()", () => {
  test("get all event handlers in providers array", () => {
    const event = "TestEvent";

    EventHandler(event)(TestHandler);

    const providers = [TestHandler];

    const eventHandlers = getEventHandlers(providers);

    expect(eventHandlers).toContainEqual(TestHandler);
  });
});

describe("registryEventHandlersInEventbus()", () => {
  const container = new Container();


  const event = "TestEvent";

  EventHandler(event)(TestHandler);
  const providers = [TestHandler];

  registryProviders(providers, container);

  const eventHandlers = [TestHandler];

});
