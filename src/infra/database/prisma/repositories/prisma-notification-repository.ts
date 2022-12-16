import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private service: PrismaService) {}
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.service.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.service.notification.count({
      where: { recipientId },
    });
    return count;
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.service.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    this.service.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.service.notification.create({
      data: raw,
    });
  }
}
