import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@nx-mess/chat-api/auth0/utils';
import { Auth0UserDto } from '@nx-mess/chat-api/shared/mappings';
import { UserService } from '@nx-mess/chat-api/user/data-access';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth0')
  @IsPublic()
  async createFromAuth0(@Body() auth0User: Auth0UserDto) {
    return await this.userService.createFromAuth0(auth0User);
  }
}
