import { EventHandler } from '../eventHandler';
import * as contextSwitchEvents from './events/contextSwitchConversationEvents';
import { Handle } from '../handle';
import { injectable, inject } from 'inversify';
import { ConversationBaseEvent, IConversationState } from './classes';
import { EventBus } from '../';
import { ConversationRepliedEvent } from './events/conversationRepliedEvent';

@injectable()
@EventHandler(contextSwitchEvents.ScheduleHaircut, contextSwitchEvents.Greeting)
export class ContextSwitchEventHandlers {
  constructor (@inject(EventBus) private eventBus: EventBus) {}
  public [Handle(contextSwitchEvents.Greeting)](event: ConversationBaseEvent) {
    const greet = 'Bom dia, com o que posso te ajudar hoje?'
    const audioFile = 'bom-dia.mp3'
    this.repl y(contextSwitchEvents.Greeting, greet, audioFile, event.state)
  }
  public [Handle(contextSwitchEvents.ScheduleHaircut)](event: ConversationBaseEvent) {
    event.state.eventsHistory.push(contextSwitchEvents.ScheduleHaircut)
    this.eventBus.publish('ScheduleHaircut.Requested', new ConversationBaseEvent(event.state))
  }

  private reply(lastEvent: string, text: string, audioFile: string, state: IConversationState) {
    state.eventsHistory.push(lastEvent)
    const conversationRepliedEvent = new ConversationRepliedEvent(state, text, audioFile)
    this.eventBus.publish(conversationRepliedEvent)
  }
}
