import { ValidationPipeOptions } from '@nestjs/common'

export const GLOBAL_VALIDATION_PIPE_CONFIG: ValidationPipeOptions =
  Object.freeze({
    transform: true,
  })
