import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { Authorize, Public } from '@/modules/auth/auth.decorator'
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'

import { LoginDto } from '@/dto/login.dto'
import { RegisterDto } from '@/dto/register.dto'
import { AuthService } from '@/modules/auth/auth.service'
import { UserService } from '@/modules/user/user.service'
import { UserDto } from '@/dto/user.dto'
import { AppRequest } from '@/types/app-request.types'
import { AuthGuard } from '@/modules/auth/auth.guard'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<string> {
    const user = await this.userService.findOneByEmail(loginDto.email)

    if (user === null) {
      throw new NotFoundException()
    }

    const passwordCorrect = await this.authService.checkPassword(
      user,
      loginDto.password,
    )

    if (!passwordCorrect) {
      throw new UnauthorizedException()
    }

    return this.authService.createToken(user)
  }

  @Post('register')
  @Public()
  @ApiOperation({})
  @ApiOkResponse({ type: String })
  @ApiConflictResponse()
  async register(@Body() registerDto: RegisterDto): Promise<string> {
    const exists = await this.userService.existsEmail(registerDto.email)

    if (exists) {
      throw new ConflictException()
    }

    const user = await this.userService.create(registerDto)
    return this.authService.createToken(user)
  }

  @Get()
  @ApiOperation({})
  @ApiOkResponse({ type: UserDto })
  @Authorize()
  async getSelf(@Req() request: AppRequest): Promise<UserDto> {
    if (!request.user) {
      throw new UnauthorizedException()
    }
    const user = await this.userService.findOne(+request.user.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return plainToInstance(UserDto, user)
  }

  @Delete()
  @Authorize()
  test() {
    return '123'
  }
}
