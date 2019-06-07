import { TodoEventHandlers } from './todoEventHandlers';
import { createModule } from '../src/module';
import { TodoService } from './todoService';

const providers = [TodoEventHandlers, TodoService];

const eventModule = createModule(providers);

const todoService = eventModule.get<TodoService>(TodoService);

todoService.createTodo('Create Tests', false);
