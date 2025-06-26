import { Injectable } from '@nestjs/common';
import { GetCommentsPhotoQueryInterface } from '../interface/get-comments-photo-query.interface';

@Injectable()
export class GetCommentsPhotoQuery implements GetCommentsPhotoQueryInterface {
    constructor() {}
}
