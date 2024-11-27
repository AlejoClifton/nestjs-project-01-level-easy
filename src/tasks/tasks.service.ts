import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async create(createTaskDto: CreateTaskDto) {
        try {
            const task = {
                state: 'pending',
                ...createTaskDto,
            };
            return await this.taskRepository.save(task);
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async findAll() {
        try {
            return await this.taskRepository.find();
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async findOne(id: number) {
        let task: Task;

        task = await this.taskRepository.findOneBy({ id });

        if (!task) throw new NotFoundException(`Task ${id} not found`);

        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.findOne(id);

        task.title = updateTaskDto.title || task.title;
        task.description = updateTaskDto.description || task.description;
        task.state = updateTaskDto.state || task.state;

        try {
            await this.taskRepository.update(id, task);

            return task;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async remove(id: number) {
        await this.findOne(id);

        try {
            await this.taskRepository.delete(id);
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    private handleExceptions(error: any) {
        throw new InternalServerErrorException(error.message || 'Internal server error');
    }
}
