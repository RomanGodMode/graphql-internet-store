import { gql, Mutation } from 'apollo-angular'
import { Injectable } from '@angular/core'
import { AuthCredentials } from '../../../../types/user-credentials'

@Injectable()
export class RegisterGQL extends Mutation<any, { registerInput: AuthCredentials }> {
  document = gql`mutation Register($registerInput: RegisterInput!){
    registerAdmin(user: $registerInput) {
      message
    }
  }`
}
