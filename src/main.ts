import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { AppEnv } from '@/types/app-env.types'

async function bootstrap() {
  const logger = new Logger(bootstrap.name, { timestamp: true })
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  })
  const config = app.get(ConfigService<AppEnv>)
  const port = config.get('PORT')
  const host = config.get('HOST')

  app.enableCors({
    origin: [config.get('CORS_ORIGIN')!],
    credentials: true,
  })
  app.setGlobalPrefix('/api')
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })
  app.set('query parser', 'extended')
  app.use(cookieParser())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sigmoid LMML')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    jsonDocumentUrl: '/docs/swagger.json',
    customSiteTitle: 'Sigmoid LMML docs',
    useGlobalPrefix: true,
  })

  await app.listen(port, host, () => {
    logger.log(`HTTP listening to ${host}:${port}`)
  })
}

bootstrap()
