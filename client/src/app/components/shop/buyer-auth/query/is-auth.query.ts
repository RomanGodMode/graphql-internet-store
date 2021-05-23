import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'

type Data = { test: string }


@Injectable()
export class IsAuthGQL extends Query<Data> {
  document = gql`
    query buyerAuthorized {
      test
    }
  `
}
