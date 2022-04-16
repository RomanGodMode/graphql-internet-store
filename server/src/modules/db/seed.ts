import { SeedingService } from './seeding/seeding.service'
import { INestApplicationContext } from '@nestjs/common'

export const seed = async (appContext: INestApplicationContext) => //NestFactory.createApplicationContext(SeedingModule)
  appContext.get(SeedingService).seed()
