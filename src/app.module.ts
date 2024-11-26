import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { TasksModule } from './tasks/tasks.module';
import { SeedModule } from './seed/seed.module';

import { Task } from './tasks/entities/task.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORTDB,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Task],
            autoLoadEntities: true,
            synchronize: true,
        }),
        TasksModule,
        SeedModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
