import { Injectable } from '@angular/core'

type MessageType = 'error' | 'success'
type Message = { id: number, text: string, type: MessageType }

@Injectable()
export class MessagesService {

  messages = [] as Message[]

  closeMessage(id: number) {
    this.messages = this.messages.filter(m => m.id !== id)
  }

  private pushMessage(text: string, type: MessageType) {
    const existingMessage = this.messages.find(message => message.text === text)
    if (existingMessage) {
      this.closeMessage(existingMessage.id)
    }

    const id = Date.now()

    this.messages.push({
      id,
      text,
      type
    })

    setTimeout(() => this.closeMessage(id), 5000)
  }

  showSuccessMessage(text: string) {
    this.pushMessage(text, 'success')
  }

  showErrorMessage(text: string, unauthorizedText = 'Необходима авторизация') {
    if (text === 'Forbidden resource') {
      text = unauthorizedText
    }
    this.pushMessage(text, 'error')
  }
}
