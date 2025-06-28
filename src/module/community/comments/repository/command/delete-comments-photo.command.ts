import { Injectable } from '@nestjs/common';
import { PrismaMasterService } from '../../../../../common/prisma/service/prisma-master.service';
import { Prisma } from '@prisma-master-client';
import { DeleteCommentsPhotoCommandInterface } from '../interface/delete-comments-photo-command.interface';

@Injectable()
export class DeleteCommentsPhotoCommand implements DeleteCommentsPhotoCommandInterface {
    constructor(private readonly prisma: PrismaMasterService) {}

    async deleteCommentsPhotosByCommentsIds(commentsIds: number[], prisma: Prisma.TransactionClient): Promise<void> {
        await prisma.comments_photo.deleteMany({
            where: {
                commentsId: {
                    in: commentsIds,
                },
            },
        });
    }
}
