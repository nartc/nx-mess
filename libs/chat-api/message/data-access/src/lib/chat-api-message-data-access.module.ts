import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Module({
  imports: [MongooseModule.forFeature([Message.feature])],
  providers: [MessageService],
  exports: [MessageService],
})
export class ChatApiMessageDataAccessModule {}
