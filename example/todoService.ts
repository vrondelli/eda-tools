import { inject, injectable } from 'inversify';
import { EventBus } from '../src/eventbus';
import { TodoCreated } from './todoEvents';

@injectable()
export class TodoService {
  constructor(@inject(EventBus) private eventBus: EventBus) {}

  public createTodo(description: string, completed: boolean) {
    const todoCreated = new TodoCreated(description, completed);

    this.eventBus.publish(todoCreated);
  }
}
