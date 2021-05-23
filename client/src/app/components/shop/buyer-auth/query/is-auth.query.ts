import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'

type Response = string


@Injectable()
export class IsAuthGQL extends Query<Response> {
  document = gql`
    query buyerAuthorized {
      test
    }
  `
}
