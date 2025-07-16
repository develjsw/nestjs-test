import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exception/filter/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(app.get(GlobalExceptionFilter));

    await app.listen(process.env.PORT ?? 1004);
}
void bootstrap();
