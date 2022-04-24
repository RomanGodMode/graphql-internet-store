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
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { CartModule } from './modules/cart/cart.module'
import { ChosenModule } from './modules/chosen/chosenModule'
import { OrderModule } from './modules/order/order.module'
import { SeedingModule } from './modules/db/seeding.module'


const isDebug = process.env.NODE_ENV !== 'production'

@Module({
  imports: [
    DatabaseModule,
    SeedingModule,
    GraphQLModule.forRoot({
      path: 'graphql',
      uploads: false,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp'
      },
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
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'uploads') }),
    FilesModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    ChosenModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
