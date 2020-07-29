import { IEvent } from "../..";
import { IConversationState } from "../classes";

export class ConversationRepliedEvent extends IEvent {
  constructor(public conversationState: IConversationState, public text: string, public audioFile: string) {
    super()
  }
}