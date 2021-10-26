import { Pipe, PipeTransform } from '@angular/core';
import { UserDto } from '@nx-mess/chat/data-access-api';

@Pipe({
  name: 'whoIsTyping',
})
export class WhoIsTypingPipe implements PipeTransform {
  transform(typingPeople: UserDto[], showMax = 3): string {
    if (!typingPeople.length) return '';

    if (typingPeople.length === 1) {
      return `${WhoIsTypingPipe.getEntityCaller(typingPeople[0])} is typing...`;
    }

    if (typingPeople.length > showMax) {
      return `3 people are typing...`;
    }

    return typingPeople
      .map(WhoIsTypingPipe.getEntityCaller)
      .join(', ')
      .concat(' are typing...');
  }

  private static getEntityCaller(user: UserDto) {
    return user.nickname || user.name || user.email;
  }
}
