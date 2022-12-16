import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it(' should be able to cancel a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();

    await fakeRepository.create(notification);

    const cancelNotification = new CancelNotification(fakeRepository);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(fakeRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(fakeRepository);

    expect(() => {
      return cancelNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
