import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import { Task } from './entities/task.entity';

@Module({
    controllers: [TasksController],
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TasksService],
})
export class TasksModule {}
