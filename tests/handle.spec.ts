import { Handle } from '../src';
import { TestEvent } from './fixtures';

describe("Handle()", () => {
  describe("when event is string type", () => {
    test("returns a global symbol for event name", () => {
      const event = 'Test'
      const handler = Handle(event);

      const expected = Symbol.for(event);

      expect(handler).toBe(expected);
    });
  });

  describe("when event is IEvent type", () => {
    test("returns a global symbol for event class name", () => {
      const handler = Handle(TestEvent);

      const expected = Symbol.for(TestEvent.name);

      expect(handler).toBe(expected);
    });
  });
});
