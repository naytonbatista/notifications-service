import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it(' should be able to cancel a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      fakeRepository,
    );

    await fakeRepository.create(
      new Notification({
        category: 'test',
        content: new Content('Nova Solicitação'),
        recipientId: 'recipient-1',
      }),
    );

    await fakeRepository.create(
      new Notification({
        category: 'test',
        content: new Content('Nova Solicitação'),
        recipientId: 'recipient-1',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });
    expect(count).toEqual(2);
  });
});
