import { IEvent } from '../../src/iEvent';

export class TestEvent extends IEvent {
  constructor(public description: string) {
    super();
  }
}
