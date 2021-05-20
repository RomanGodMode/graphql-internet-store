import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as redis from 'redis'
import * as session from 'express-session'
import * as Store from 'connect-redis'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const RedisStore = Store(session)

  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  })

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
  })

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365, // год
      },
    }),
  )

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(8080)
}

bootstrap()
