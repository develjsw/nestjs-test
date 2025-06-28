import { Prisma } from '@prisma-master-client';

export interface DeleteCommentsPhotoCommandInterface {
    deleteCommentsPhotosByCommentsIds(commentsIds: number[], prisma: Prisma.TransactionClient): Promise<void>;
}
