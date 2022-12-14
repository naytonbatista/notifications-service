import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DataBaseModule {}
