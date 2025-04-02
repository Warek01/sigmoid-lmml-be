import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { AppEnv } from '@/types/app-env.types'

export const DB_CONFIG: TypeOrmModuleAsyncOptions = Object.freeze({
  inject: [ConfigService],
  useFactory: (conf: ConfigService<AppEnv>): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: conf.get('DB_HOST'),
    port: conf.get('DB_PORT'),
    database: conf.get('DB_NAME'),
    username: conf.get('DB_USER'),
    password: conf.get('DB_PASSWORD'),
    entities: ['**/*.entity.js'],
    synchronize: conf.get('NODE_ENV') === 'development',
    migrationsRun: conf.get('NODE_ENV') === 'development',
  }),
})
