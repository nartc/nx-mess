import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([User.feature])],
  providers: [UserService],
  exports: [UserService],
})
export class ChatApiUserDataAccessModule {}
