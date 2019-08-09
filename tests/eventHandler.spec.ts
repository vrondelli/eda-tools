import { EventHandler, EVENTS_HANDLER_METADATA } from '../src';
import { TestHandler, TestEvent } from './fixtures';

describe("@EventHandler decorator", () => {
  describe("when event is string type", () => {
    test('Defines a string metadata for event handler class', () => {
      const event = "TestEvent";

      EventHandler(event)(TestHandler);

      const metadata = Reflect.getMetadata(EVENTS_HANDLER_METADATA, TestHandler);

      expect(metadata).toContainEqual(event);
    });
  });

  describe("when event is IEvent type", () => {
    test('Defines a event metadata for event handler class', () => {
      EventHandler(TestEvent)(TestHandler);

      const metadata = Reflect.getMetadata(EVENTS_HANDLER_METADATA, TestHandler);

      expect(metadata).toContainEqual(TestEvent);
    });
  });
});
