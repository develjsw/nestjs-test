import { Injectable } from '@nestjs/common';
import { GetCommentsQueryInterface } from '../interface/get-comments-query.interface';

@Injectable()
export class GetCommentsQuery implements GetCommentsQueryInterface {
    constructor() {}
}
