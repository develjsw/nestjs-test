import { Module } from '@nestjs/common';
import { GET_USER_QUERY_INTERFACE } from './repository/constant/interface-tokens';
import { GetUserQuery } from './repository/query/get-user.query';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: GET_USER_QUERY_INTERFACE,
            useClass: GetUserQuery,
        },
    ],
    exports: [GET_USER_QUERY_INTERFACE],
})
export class UserModule {}
