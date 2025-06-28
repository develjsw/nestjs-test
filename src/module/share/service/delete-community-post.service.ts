import { Inject, Injectable } from '@nestjs/common';
import {
    DELETE_POST_COMMAND_INTERFACE,
    DELETE_POST_PHOTO_COMMAND_INTERFACE,
} from '../../community/post/repository/constant/interface.token';
import { DeletePostCommandInterface } from '../../community/post/repository/interface/delete-post-command.interface';
import { PrismaMasterService } from '../../../common/prisma/service/prisma-master.service';
import {
    DELETE_COMMENTS_COMMAND_INTERFACE,
    DELETE_COMMENTS_PHOTO_COMMAND_INTERFACE,
} from '../../community/comments/repository/constant/interface-token';
import { DeleteCommentsCommandInterface } from '../../community/comments/repository/interface/delete-comments-command.interface';
import { DeleteCommentsPhotoCommandInterface } from '../../community/comments/repository/interface/delete-comments-photo-command.interface';
import { DeletePostPhotoCommandInterface } from '../../community/post/repository/interface/delete-post-photo-command.interface';
import { Prisma } from '@prisma-master-client';

@Injectable()
export class DeleteCommunityPostService {
    constructor(
        private readonly prismaMasterService: PrismaMasterService,

        @Inject(DELETE_POST_COMMAND_INTERFACE)
        private readonly deletePostCommand: DeletePostCommandInterface,
        @Inject(DELETE_POST_PHOTO_COMMAND_INTERFACE)
        private readonly deletePostPhotoCommand: DeletePostPhotoCommandInterface,
        @Inject(DELETE_COMMENTS_COMMAND_INTERFACE)
        private readonly deleteCommentsCommand: DeleteCommentsCommandInterface,
        @Inject(DELETE_COMMENTS_PHOTO_COMMAND_INTERFACE)
        private readonly deleteCommentsPhotoCommand: DeleteCommentsPhotoCommandInterface,
    ) {}

    // 특정 유저의 특정 게시판 관련 게시글 + 이미지 + 댓글 삭제
    async deleteCommunityPostsByUserAndBoard(userId: number, boardId: number): Promise<void> {
        await this.prismaMasterService.runInTransaction(async prisma => {
            const { postIds, commentsIds } = await this.getDeleteTargets(userId, boardId, prisma);

            if (commentsIds.length) {
                await this.deleteCommentsData(commentsIds, prisma);
            }
            if (postIds.length) {
                await this.deletePostData(postIds, prisma);
            }
        });
    }

    async getDeleteTargets(
        targetUserId: number,
        targetBoardId: number,
        prisma: Prisma.TransactionClient,
    ): Promise<{ postIds: number[]; commentsIds: number[] }> {
        // 게시글
        const posts = await this.deletePostCommand.findPostsByUserIdAndBoardId(targetUserId, targetBoardId, prisma);
        const postIds = posts.map(({ postId }) => postId);

        // 댓글
        const comments = await this.deleteCommentsCommand.findCommentsByPostIds(postIds, prisma);
        const commentsIds = comments.map(({ commentsId }) => commentsId);

        // 자식 댓글
        // const childComments = await this.deleteCommentCommand.findCommentsByParentIds(commentsIds, prisma);
        // const childCommentsIds = childComments.map(({ commentsId }) => commentsId);

        return {
            postIds,
            commentsIds,
        };
    }

    async deleteCommentsData(commentsIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await this.deleteCommentsCommand.deleteCommentsByIds(commentsIds, prisma);
        await this.deleteCommentsPhotoCommand.deleteCommentsPhotosByCommentsIds(commentsIds, prisma);
    }
    async deletePostData(postIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await this.deletePostCommand.deletePostsByIds(postIds, prisma);
        await this.deletePostPhotoCommand.deletePostPhotosByPostIds(postIds, prisma);
    }
}
