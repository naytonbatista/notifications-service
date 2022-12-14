import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it(' should be able to send a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(fakeRepository);
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(fakeRepository.notifications).toHaveLength(1);
    expect(fakeRepository.notifications[0]).toEqual(notification);
  });
});
