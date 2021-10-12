import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth0UserDto, UserDto } from '@nx-mess/chat-api/data-access-shared';
import { UserService } from '@nx-mess/chat-api/data-access-user';
import {
  AllowAnonymous,
  ApiErrors,
  CurrentUser,
} from '@nx-mess/chat-api/utils-shared';

@Controller('users')
@ApiTags('users')
@ApiErrors()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth0')
  @AllowAnonymous()
  @ApiExcludeEndpoint()
  async createFromAuth0(@Body() auth0User: Auth0UserDto) {
    return await this.userService.createFromAuth0(auth0User);
  }

  @Put(':auth0Id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picture: {
          type: 'string',
        },
      },
      required: ['picture'],
    },
  })
  @ApiCreatedResponse()
  async updateAuth0(
    @Param('auth0Id') auth0Id: string,
    @Body('picture') picture: string
  ): Promise<void> {
    return await this.userService.updateUserPictureFromAuth0(auth0Id, picture);
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async me(@CurrentUser() auth0User: Auth0UserDto): Promise<UserDto> {
    return await this.userService.getMe(auth0User.user_id);
  }
}
