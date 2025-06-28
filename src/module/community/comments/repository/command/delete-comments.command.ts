import { Injectable } from '@nestjs/common';
import { PrismaMasterService } from '../../../../../common/prisma/service/prisma-master.service';
import { Prisma, comments } from '@prisma-master-client';
import { DeleteCommentsCommandInterface } from '../interface/delete-comments-command.interface';

@Injectable()
export class DeleteCommentsCommand implements DeleteCommentsCommandInterface {
    constructor(private readonly prisma: PrismaMasterService) {}

    // Transaction 내에 데이터 정합성을 위한 조회쿼리는 여기에 작성
    async findCommentsByPostIds(postIds: number[], prisma: Prisma.TransactionClient): Promise<comments[]> {
        return prisma.comments.findMany({
            where: {
                postId: {
                    in: postIds,
                },
            },
        });
    }

    // Transaction 내에 데이터 정합성을 위한 조회쿼리는 여기에 작성
    async findCommentsByParentIds(parentIds: number[], prisma: Prisma.TransactionClient): Promise<comments[]> {
        return prisma.comments.findMany({
            where: {
                parentId: {
                    in: parentIds,
                },
            },
        });
    }

    async deleteCommentsByIds(commentsIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await prisma.comments.deleteMany({
            where: {
                commentsId: {
                    in: commentsIds,
                },
            },
        });
    }
}
