import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ENV_CONFIG } from '@/config/env.config'
import { GLOBAL_VALIDATION_PIPE_CONFIG } from '@/config/global-validation-pipe.config'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { HealthModule } from '@/modules/health/health.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { RolesGuard } from '@/modules/auth/roles.guard'
import { LoggingInterceptor } from '@/interceptors/logging.interceptor'
import { DB_CONFIG } from '@/config/db.config'

@Module({
  imports: [
    ConfigModule.forRoot(ENV_CONFIG),
    TypeOrmModule.forRootAsync(DB_CONFIG),
    HealthModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(GLOBAL_VALIDATION_PIPE_CONFIG),
    },
  ],
  exports: [],
})
export class AppModule {}
