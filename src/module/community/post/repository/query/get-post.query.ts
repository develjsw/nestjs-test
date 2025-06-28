import { Injectable } from '@nestjs/common';
import { GetPostQueryInterface } from '../interface/get-post-query.interface';

@Injectable()
export class GetPostQuery implements GetPostQueryInterface {}
