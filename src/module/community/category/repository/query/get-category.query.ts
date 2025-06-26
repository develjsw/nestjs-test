import { Injectable } from '@nestjs/common';
import { GetCategoryQueryInterface } from '../interface/get-category-query.interface';

@Injectable()
export class GetCategoryQuery implements GetCategoryQueryInterface {
    constructor() {}
}
