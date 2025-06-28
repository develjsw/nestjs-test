import { Injectable } from '@nestjs/common';
import { PrismaMasterService } from '../../../../../common/prisma/service/prisma-master.service';
import { Prisma, post } from '@prisma-master-client';
import { DeletePostCommandInterface } from '../interface/delete-post-command.interface';

@Injectable()
export class DeletePostCommand implements DeletePostCommandInterface {
    constructor(private readonly prisma: PrismaMasterService) {}

    // Transaction 내에 데이터 정합성을 위한 조회쿼리는 여기에 작성
    async findPostsByUserIdAndBoardId(
        userId: number,
        boardId: number,
        prisma: Prisma.TransactionClient,
    ): Promise<post[]> {
        return prisma.post.findMany({
            where: {
                userId,
                boardId,
            },
        });
    }

    async deletePostsByIds(postsIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await prisma.post.deleteMany({
            where: {
                postId: {
                    in: postsIds,
                },
            },
        });
    }
}
