import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

import { Task } from 'src/tasks/entities/task.entity';

@Module({
    controllers: [SeedController],
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [SeedService],
})
export class SeedModule {}
