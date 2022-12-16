import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it(' should be able to unread a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification({ readAt: new Date() });

    await fakeRepository.create(notification);

    const unreadNotification = new UnreadNotification(fakeRepository);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(fakeRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(fakeRepository);

    expect(() => {
      return unreadNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
