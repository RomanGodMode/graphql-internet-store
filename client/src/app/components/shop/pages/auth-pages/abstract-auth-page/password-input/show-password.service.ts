import { Injectable } from '@angular/core'


@Injectable()
export class ShowPasswordService {

  passwordHidden = false

  toggleHidden() {
    this.passwordHidden = !this.passwordHidden
  }

  constructor() {
  }
}
