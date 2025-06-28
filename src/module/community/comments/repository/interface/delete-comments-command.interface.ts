import { comments, Prisma } from '@prisma-master-client';

export interface DeleteCommentsCommandInterface {
    findCommentsByPostIds(postIds: number[], prisma: Prisma.TransactionClient): Promise<comments[]>;
    findCommentsByParentIds(parentIds: number[], prisma: Prisma.TransactionClient): Promise<comments[]>;

    deleteCommentsByIds(commentsIds: number[], prisma: Prisma.TransactionClient): Promise<void>;
}
