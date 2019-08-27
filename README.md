## About

A simple library that contain some tools for developting event-driven apps.

## Motivation

There is little to none libraries for making Event-Driven architectures in node.js ecosystem. The ones that I know of are only nest.js and tokilabs/farm. Both offer support for event-sourcing in node.js applications but with the downside of having to use the entire framework. So I decided to create, based on these two frameworks some tools for developing EDA apps, I wanted to make sure that they are easy to use, flexible and extremely pluggable.

## Installation

## Recipe

### Step 1: Create your events

If you decided that your events will be classes create the events classes and extend IEvent class. Otherwise, you can just assign string values to some variables or create an enum.

```ts
export class TodoCreated extends IEvent {
  constructor(public description: string, public completed?: boolean) {
    super();
  }
}
```

or

```ts
const TodoCreated = 'TodoCreated';
```

or

```ts
enum TodoEvents {
  TodoCreated = 'TodoCreated'
}
```

### Step 2: Create your events handlers class

Decorate your events handlers class with @injectable and @EventHandler decorators, using the events that you want to handle as parameter in the @EventHandler decorator.

```ts
@injectable()
@EventHandler(TodoCreated)
export class TodoEventHandlers {
  public [Handle(TodoCreated)](event: TodoCreated) {
    console.log(`Todo Created, description: ${event.description}`);
    console.log(`Todo completed: ${event.completed}`);
  }
}
```

### Step 3: Create the module

First you have to create a array with the providers, which can be all services that you want to inject in your application with all eventHandlers, next call the function createModule.

The function createModule accepts you custom inversify container or container options and your custom transport as parameters, if not given a basic inversify and a basic message transport which uses node event emitter, are default values.

```ts
const providers = [TodoEventHandlers, TodoService];

const eventModule = createModule(providers);
```

### Step 4: Using the EventBus to publish events

Now you can use the EventBus to publish you events, by injecting in a service.

```ts
@injectable()
export class TodoService {
  constructor(@inject(EventBus) private eventBus: EventBus) {}

  public createTodo(description: string, completed: boolean) {
    const todoCreated = new TodoCreated(description, completed);

    this.eventBus.publish(todoCreated);
  }
}
```

## License

License under the MIT License (MIT)

Copyright © 2015-2017 [Remo H. Jansen](http://www.remojansen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
