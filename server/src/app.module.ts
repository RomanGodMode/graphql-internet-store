import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './modules/db/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/products/product.module'
import { graphqlUploadExpress } from 'graphql-upload'
import { FilesModule } from './modules/files/files.module'


const isDebug = process.env.NODE_ENV !== 'production'

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      path: 'graphql',
      uploads: false,
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
        try {
          const graphQLFormattedError: GraphQLFormattedError = {
            message: error.extensions.exception.response.message,
            extensions: {// если это поле не запросить оно всё равно прийдёт
              code: error.extensions.exception.response.statusCode
            }
          }
          return graphQLFormattedError
        } catch {
          return error
        }
      }
    }),
    FilesModule,
    AuthModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
