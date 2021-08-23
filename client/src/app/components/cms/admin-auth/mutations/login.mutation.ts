import { gql, Mutation } from 'apollo-angular'
import { Injectable } from '@angular/core'
import { AuthCredentials } from '../../../../types/user-credentials'

@Injectable()
export class LoginGQL extends Mutation<any, { loginInput: AuthCredentials }> {
  document = gql`mutation Login($loginInput: LoginInput!) {
    loginAdmin(user: $loginInput){
      message
    }
  }`
}
