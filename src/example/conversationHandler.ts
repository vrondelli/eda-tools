import * as Hapi from '@hapi/hapi';
import { inject, injectable } from 'inversify';
import { EventBus } from '../eventbus';
import { ConversationRepliedEvent } from './events/conversationRepliedEvent';
import { NlpService } from './nlpService';
import { IConversationState } from './classes';
import { ContextSwitchContext } from './events/contextSwitchConversationEvents';

const conversationSessionStateCache = {}

export interface IConversationRequest {
  speech: string;
  conversationId: string;
}

@injectable()
export class ConversationRouteHandler {
  constructor(
    @inject(EventBus) private eventBus: EventBus,
    @inject(NlpService) private nlpService: NlpService
  ) {}
  public handleConversation (request: Hapi.Request) {
    return new Promise<ConversationRepliedEvent>((resolve, reject) => {
      this.eventBus.subscribe(ConversationRepliedEvent, this.replyConversation(resolve))
      const payload = <IConversationRequest>(request.payload)
      const conversationId = payload.conversationId
      const speech = payload.speech
      const lastState: IConversationState = conversationSessionStateCache[conversationId] || {}
      const context = lastState.context || ContextSwitchContext
      const intention = this.nlpService.getIntention(speech, context)
      const conversationEvent = `${context}.${intention}`
      const eventsHistory = lastState.eventsHistory ? [...lastState.eventsHistory, conversationEvent] : [conversationEvent]
      const nextState: IConversationState = {
        conversationId,
        context,
        speech,
        eventsHistory,
        lastIntention: intention,
        lastEvent: conversationEvent
      }
      this.eventBus.publish(conversationEvent, {state: nextState})
    })
  }

  private replyConversation(resolve: (value: unknown) => void) {
    return (message: ConversationRepliedEvent) => {
      this.saveConversationSessionState(message.conversationState)
      resolve({conversationReply: message.text, audioFile: message.audioFile})
    }
  }

  private saveConversationSessionState(state: IConversationState) {
    conversationSessionStateCache[state.conversationId] = state
  }
}
