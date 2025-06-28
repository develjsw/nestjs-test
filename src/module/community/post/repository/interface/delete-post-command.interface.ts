import { post, Prisma } from '@prisma-master-client';

export interface DeletePostCommandInterface {
    findPostsByUserIdAndBoardId(userId: number, boardId: number, prisma: Prisma.TransactionClient): Promise<post[]>;

    deletePostsByIds(postsIds: number[], prisma: Prisma.TransactionClient): Promise<void>;
}
