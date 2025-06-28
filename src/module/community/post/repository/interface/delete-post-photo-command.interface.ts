import { Prisma } from '@prisma-master-client';

export interface DeletePostPhotoCommandInterface {
    deletePostPhotosByPostIds(postIds: number[], prisma: Prisma.TransactionClient): Promise<void>;
}
