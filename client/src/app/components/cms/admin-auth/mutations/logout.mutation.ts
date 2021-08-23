import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'


@Injectable()
export class LogoutGQL extends Mutation<{ logout: null }, {}> {
  document = gql`mutation Logout {
    logout{
      message
    }
  }
  `
}
