import { Injectable } from '@nestjs/common';
import { PrismaMasterService } from '../../../../../common/prisma/service/prisma-master.service';
import { Prisma } from '@prisma-master-client';
import { DeletePostPhotoCommandInterface } from '../interface/delete-post-photo-command.interface';

@Injectable()
export class DeletePostPhotoCommand implements DeletePostPhotoCommandInterface {
    constructor(private readonly prisma: PrismaMasterService) {}

    async deletePostPhotosByPostIds(postIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await prisma.post_photo.deleteMany({
            where: {
                postId: {
                    in: postIds,
                },
            },
        });
    }
}
