import { Injectable } from '@nestjs/common';
import { GetPostPhotoQueryInterface } from '../interface/get-post-photo-query.interface';

@Injectable()
export class GetPostPhotoQuery implements GetPostPhotoQueryInterface {
    constructor() {}
}
