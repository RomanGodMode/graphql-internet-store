import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './modules/db/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { CategoryModule } from './modules/category/category.module'

const isDebug = process.env.NODE_ENV !== 'production'

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: isDebug,
      playground: {
        settings: {
          'request.credentials': 'include'
        }
      },
      cors: {
        credentials: true,
        origin: true
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response.message,
          extensions: {// если это поле не запросить оно всё равно прийдёт
            code: error.extensions.exception.response.statusCode
          }
        }
        return graphQLFormattedError
      }
    }),
    AuthModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
