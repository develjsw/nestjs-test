import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { CommunityModule } from './module/community/community.module';
import { PaymentModule } from './module/payment/payment.module';
import { ShareModule } from './module/share/share.module';
import { UserModule } from './module/user/user.module';

@Module({
    imports: [PrismaModule, CommunityModule, PaymentModule, ShareModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
