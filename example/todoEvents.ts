import { IEvent } from '../src/iEvent';

export class TodoCreated extends IEvent {
  constructor(
    public description: string,
    public completed?: boolean 
  ) {
    super();
  }
}
