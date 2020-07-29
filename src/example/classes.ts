export class IConversationState {
  constructor(
    public conversationId: string,
    public speech: string,
    public eventsHistory: string[],
    public context: string,
    public lastIntention: string,
    public lastEvent: string
  ) {}
}

export class ConversationBaseEvent {
  constructor(public state: IConversationState) {}
}