export const USER_QUEUE = 'userQueue' as const;
export const MESSAGE_QUEUE = 'messageQueue' as const;

export function getFullQueueName(queueName: string): string {
  return `BullQueue_${queueName}`;
}
