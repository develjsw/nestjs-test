import { Module } from '@nestjs/common';
import { CommunityModule } from '../community/community.module';
import { DeleteCommunityPostService } from './service/delete-community-post.service';

@Module({
    imports: [CommunityModule],
    controllers: [],
    providers: [DeleteCommunityPostService],
    exports: [],
})
export class ShareModule {}
