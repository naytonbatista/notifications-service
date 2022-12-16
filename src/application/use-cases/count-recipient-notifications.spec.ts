import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it(' should be able to cancel a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      fakeRepository,
    );

    await fakeRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await fakeRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await fakeRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });
    expect(count).toEqual(2);
  });
});
