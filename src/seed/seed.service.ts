import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from 'src/tasks/entities/task.entity';

import { seedTasks } from './seedTasks';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async executeSeed() {
        try {
            await this.taskRepository.save(seedTasks);

            return 'Seed ejecutado correctamente';
        } catch (error) {
            console.error('Error al ejecutar el seed:', error);
        }
    }
}
