import { EventHandler } from '../eventHandler';
import { Handle } from '../handle';
import { injectable, inject } from 'inversify';
import { ConversationBaseEvent, IConversationState } from './classes';
import { EventBus } from '../';
import { ConversationRepliedEvent } from './events/conversationRepliedEvent';
import * as ScheduleHaircutEvents from './events/scheduleHairCutEvents'

@injectable()
@EventHandler(ScheduleHaircutEvents.ScheduleHaircutRequested)
export class ScheduleHaircutEventHandlers {
  constructor (@inject(EventBus) private eventBus: EventBus) {}
  public [Handle(ScheduleHaircutEvents.ScheduleHaircutRequested)](event: ConversationBaseEvent) {
    console.log('hahahahahsuadhsaiudhias')
    const horarios = ['10:00', '15:00']
    const schdule = `Bom, temos disponiveis os seguintes horarios: ${horarios.join(', ')}`
    const audioFile = 'horarios-diponiveis.mp3'

    this.reply(ScheduleHaircutEvents.ScheduleHaircutRequested, schdule, audioFile, event.state)
  }

  private reply(lastEvent: string, text: string, audioFile: string, state: IConversationState) {
    state.eventsHistory.push(lastEvent)
    const conversationRepliedEvent = new ConversationRepliedEvent(state, text, audioFile)
    this.eventBus.publish(conversationRepliedEvent)
  }
}
