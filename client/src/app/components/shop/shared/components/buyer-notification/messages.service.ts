import { Injectable } from '@angular/core'

type Message = { id: number, text: string }

@Injectable()
export class MessagesService {

  messages = [] as Message[]

  closeMessage(id: number) {
    this.messages.splice(this.messages.findIndex(m => m.id === id), 1)
  }

  showMessage(text: string) {
    if (!this.messages.some(message => message.text === text)) {
      const id = Date.now()

      this.messages.push({
        id,
        text
      })

      setTimeout(() => this.closeMessage(id), 5000)
    }
  }
}
