import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'

type Data = { testAdmin: string }


@Injectable()
export class IsAuthGQL extends Query<Data> {
  document = gql`
    query adminAuthorized {
      testAdmin
    }
  `
}
