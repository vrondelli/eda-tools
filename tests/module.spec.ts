import { Container } from 'inversify';
import {
  registerProviders,
  EventHandler,
  getEventHandlers,
  Transport,
  registerEventHandlersInEventbus,
  IEventBus,
  createModule
} from '../src';
import { TestHandler } from './fixtures';

describe("registerProviders()", () => {
  test("register providers in a inversify container", () => {
    const container = new Container();

    const providers = [TestHandler];

    registerProviders(providers, container);

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

describe("registerEventHandlersInEventbus()", () => {
  test("register all eventHandlers in eventBus", () => {
    const EventBusMock = jest.fn<IEventBus, any>(() => ({
      subscribe: jest.fn(),
      subscribeAll: jest.fn(),
      unsubscribe: jest.fn(),
      publish: jest.fn(),
    }));

    const eventbus = new EventBusMock();

    const container = new Container();

    const event = "TestEvent";

    EventHandler(event)(TestHandler);
    const providers = [TestHandler];

    registerProviders(providers, container);

    const eventHandlers = [TestHandler];

    const eventHandlerInstance = container.get<TestHandler>(TestHandler);

    registerEventHandlersInEventbus(eventbus, eventHandlers, container);

    expect(eventbus.subscribeAll).toHaveBeenCalledWith([event], eventHandlerInstance);
  });
});

describe("createModule()", () => {
  describe("registers providers in container and subscribes eventHandlers in eventBus", () => {
    describe("when passing a custom container as parameter", () => {
      test("returns your custom container with all providers registered", () => {
        const container = new Container();

        const event = "TestEvent";

        EventHandler(event)(TestHandler);
        const providers = [TestHandler];

        const module = createModule(providers, undefined, container);

        expect(module.id).toBe(container.id);
      });
    });
  })
});
