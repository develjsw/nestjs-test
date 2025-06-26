import { Module } from '@nestjs/common';
import { GET_CATEGORY_QUERY_INTERFACE } from './category/repository/constant/interface-token';
import { GetCategoryQuery } from './category/repository/query/get-category.query';
import { GET_BOARD_QUERY_INTERFACE } from './board/repository/constant/interface-token';
import { GetBoardQuery } from './board/repository/query/get-board.query';
import { GET_POST_QUERY_INTERFACE } from './post/repository/constant/interface.token';
import { GetPostQuery } from './post/repository/query/get-post.query';
import { GET_POST_PHOTO_QUERY_INTERFACE } from './post-photo/repository/constant/interface.token';
import { GetPostPhotoQuery } from './post-photo/repository/query/get-post-photo.query';
import { GET_COMMENTS_QUERY_INTERFACE } from './comments/repository/constant/interface-token';
import { GetCommentsQuery } from './comments/repository/query/get-comments.query';
import { GET_COMMENTS_PHOTO_QUERY_INTERFACE } from './comments-photo/repository/constant/interface-token';
import { GetCommentsPhotoQuery } from './comments-photo/repository/query/get-comments-photo.query';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: GET_CATEGORY_QUERY_INTERFACE,
            useClass: GetCategoryQuery,
        },
        {
            provide: GET_BOARD_QUERY_INTERFACE,
            useClass: GetBoardQuery,
        },
        {
            provide: GET_POST_QUERY_INTERFACE,
            useClass: GetPostQuery,
        },
        {
            provide: GET_POST_PHOTO_QUERY_INTERFACE,
            useClass: GetPostPhotoQuery,
        },
        {
            provide: GET_COMMENTS_QUERY_INTERFACE,
            useClass: GetCommentsQuery,
        },
        {
            provide: GET_COMMENTS_PHOTO_QUERY_INTERFACE,
            useClass: GetCommentsPhotoQuery,
        },
    ],
    exports: [
        GET_CATEGORY_QUERY_INTERFACE,
        GET_BOARD_QUERY_INTERFACE,
        GET_POST_QUERY_INTERFACE,
        GET_POST_PHOTO_QUERY_INTERFACE,
        GET_COMMENTS_QUERY_INTERFACE,
        GET_COMMENTS_PHOTO_QUERY_INTERFACE,
    ],
})
export class CommunityModule {}
