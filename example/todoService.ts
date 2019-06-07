import { inject, injectable } from 'inversify';
import { EventBus } from '../src/eventbus';
import { TodoCreated } from './todoEvents';

@injectable()
export class TodoService {
  constructor(@inject(EventBus) private eventBus: EventBus) {}

  public createTodo(description: string, completed: boolean) {
    const todoCreated = new TodoCreated(description, completed);

    console.log(this.eventBus, todoCreated);

    this.eventBus.publish(todoCreated);
  }
}
