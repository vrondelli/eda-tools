import { ContextSwitchContext } from "./events/contextSwitchConversationEvents"
import { injectable } from "inversify"

@injectable()
export class NlpService {
  public getIntention(speech: string, context: string) {
    const speechsIntentionMap = {
      [ContextSwitchContext]: {
        ['bom dia']: 'Greeting',
        ['quero marcar cabeleleiro']: 'ScheduleHaircut'
      }
    }
    return speechsIntentionMap[context][speech.toLowerCase()] ? speechsIntentionMap[context][speech.toLowerCase()] : 'None'
  }
}