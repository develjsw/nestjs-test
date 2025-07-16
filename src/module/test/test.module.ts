import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { PostRepository } from './repository/post-repository';
import { CommentsRepository } from './repository/comments.repository';

@Module({
    imports: [],
    controllers: [TestController],
    providers: [PostRepository, CommentsRepository],
    exports: [],
})
export class TestModule {}
