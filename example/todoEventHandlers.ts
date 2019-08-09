import { EventHandler } from '../src/eventHandler';
import { TodoCreated } from './todoEvents';
import { Handle } from '../src/handle';
import { injectable } from 'inversify';

@injectable()
@EventHandler(TodoCreated)
export class TodoEventHandlers {
  public [Handle(TodoCreated)](event: TodoCreated) {
    console.log(`Todo Created, description: ${event.description}`);
    console.log(`Todo completed: ${event.completed}`);
  }
}
