import { Module } from '@nestjs/common';
import { CommunityModule } from '../community/community.module';
import { DeleteCommunityPostService } from './service/delete-community-post.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [CommunityModule, UserModule],
    controllers: [],
    providers: [DeleteCommunityPostService],
    exports: [],
})
export class ShareModule {}
