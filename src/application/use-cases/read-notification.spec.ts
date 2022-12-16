import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it(' should be able to read a notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();

    await fakeRepository.create(notification);

    const readNotification = new ReadNotification(fakeRepository);

    await readNotification.execute({ notificationId: notification.id });

    expect(fakeRepository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    const fakeRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(fakeRepository);

    expect(() => {
      return readNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
