import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async me(@CurrentUser() auth0User: Auth0UserDto): Promise<UserDto> {
    return await this.userService.getMe(auth0User.user_id);
  }
}
