import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      creatAt: notification.createdAt,
    };
  }

  static toDomain(rawNotification: RawNotification): Notification {
    return new Notification(
      {
        category: rawNotification.category,
        content: new Content(rawNotification.content),
        recipientId: rawNotification.recipientId,
        canceledAt: rawNotification.canceledAt,
        createdAt: rawNotification.createdAt,
        readAt: rawNotification.readAt,
      },
      rawNotification.id,
    );
  }
}
