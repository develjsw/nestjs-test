import { Module } from '@nestjs/common';
import { GET_CATEGORY_QUERY_INTERFACE } from './category/repository/constant/interface-token';
import { GetCategoryQuery } from './category/repository/query/get-category.query';
import { GET_BOARD_QUERY_INTERFACE } from './board/repository/constant/interface-token';
import { GetBoardQuery } from './board/repository/query/get-board.query';
import {
    DELETE_POST_COMMAND_INTERFACE,
    DELETE_POST_PHOTO_COMMAND_INTERFACE,
    GET_POST_QUERY_INTERFACE,
} from './post/repository/constant/interface.token';
import { GetPostQuery } from './post/repository/query/get-post.query';
import {
    DELETE_COMMENTS_COMMAND_INTERFACE,
    DELETE_COMMENTS_PHOTO_COMMAND_INTERFACE,
    GET_COMMENTS_QUERY_INTERFACE,
} from './comments/repository/constant/interface-token';
import { GetCommentsQuery } from './comments/repository/query/get-comments.query';
import { DeletePostCommand } from './post/repository/command/delete-post.command';
import { DeleteCommentsCommand } from './comments/repository/command/delete-comments.command';
import { DeleteCommentsPhotoCommand } from './comments/repository/command/delete-comments-photo.command';
import { DeletePostPhotoCommand } from './post/repository/command/delete-post-photo.command';

@Module({
    imports: [],
    controllers: [],
    providers: [
        // category
        {
            provide: GET_CATEGORY_QUERY_INTERFACE,
            useClass: GetCategoryQuery,
        },
        // board
        {
            provide: GET_BOARD_QUERY_INTERFACE,
            useClass: GetBoardQuery,
        },
        // post
        {
            provide: GET_POST_QUERY_INTERFACE,
            useClass: GetPostQuery,
        },
        {
            provide: DELETE_POST_COMMAND_INTERFACE,
            useClass: DeletePostCommand,
        },
        // post-photo
        {
            provide: DELETE_POST_PHOTO_COMMAND_INTERFACE,
            useClass: DeletePostPhotoCommand,
        },

        // comments
        {
            provide: GET_COMMENTS_QUERY_INTERFACE,
            useClass: GetCommentsQuery,
        },
        {
            provide: DELETE_COMMENTS_COMMAND_INTERFACE,
            useClass: DeleteCommentsCommand,
        },
        // comments-photo
        {
            provide: DELETE_COMMENTS_PHOTO_COMMAND_INTERFACE,
            useClass: DeleteCommentsPhotoCommand,
        },
    ],
    exports: [
        GET_CATEGORY_QUERY_INTERFACE,

        GET_BOARD_QUERY_INTERFACE,

        GET_POST_QUERY_INTERFACE,
        DELETE_POST_COMMAND_INTERFACE,

        DELETE_POST_PHOTO_COMMAND_INTERFACE,

        GET_COMMENTS_QUERY_INTERFACE,
        DELETE_COMMENTS_COMMAND_INTERFACE,

        DELETE_COMMENTS_PHOTO_COMMAND_INTERFACE,
    ],
})
export class CommunityModule {}
