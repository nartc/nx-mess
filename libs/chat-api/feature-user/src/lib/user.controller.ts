import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Auth0UserDto } from '@nx-mess/chat-api/data-access-shared';
import { UserService } from '@nx-mess/chat-api/data-access-user';
import { AllowAnonymous } from '@nx-mess/chat-api/utils-shared';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth0')
  @AllowAnonymous()
  @ApiExcludeEndpoint()
  async createFromAuth0(@Body() auth0User: Auth0UserDto) {
    return await this.userService.createFromAuth0(auth0User);
  }
}
