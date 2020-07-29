import * as Hapi from '@hapi/hapi';
import { ConversationRouteHandler } from './conversationHandler';
import { createModule } from '../';
import { NlpService } from './nlpService';
import { ContextSwitchEventHandlers } from './contextSwitchEventHandlers';
import { ScheduleHaircutEventHandlers } from './scheduleHaircutEventHandlers'

export async function init(
): Promise<Hapi.Server> {
  try {
    const port = process.env.PORT || 3001;
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: port,
      routes: {
        cors: {
          origin: ["*"]
        }
      }
    });

    const providers = [ConversationRouteHandler, NlpService, ContextSwitchEventHandlers, ScheduleHaircutEventHandlers];
    const eventModule = createModule(providers);

    server.route([{
      method: 'POST',
      path: '/conversation',
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        const conversationRouteHandler = eventModule.get<ConversationRouteHandler>(ConversationRouteHandler)
        return conversationRouteHandler.handleConversation(request).then(reply => h.response(reply))
      }
    }])
    console.log("Routes registered sucessfully.");

    return server;
  } catch (err) {
    console.log("Error starting server: ", err);
    throw err;
  }
}