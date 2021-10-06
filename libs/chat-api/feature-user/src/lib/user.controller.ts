import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth0UserDto } from '@nx-mess/chat-api/shared-data-access';
import { AllowAnonymous } from '@nx-mess/chat-api/shared-utils';
import { UserService } from '@nx-mess/chat-api/data-access-user';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth0')
  @AllowAnonymous()
  async createFromAuth0(@Body() auth0User: Auth0UserDto) {
    return await this.userService.createFromAuth0(auth0User);
  }
}
