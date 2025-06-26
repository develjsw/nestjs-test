import { Injectable } from '@nestjs/common';
import { GetBoardQueryInterface } from '../interface/get-board-query.interface';

@Injectable()
export class GetBoardQuery implements GetBoardQueryInterface {
    constructor() {}
}
