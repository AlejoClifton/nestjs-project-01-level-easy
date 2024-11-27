import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const mockTasksService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, title: 'Test Task', description: 'Test Description', state: 'pending' }]),
    findOne: jest.fn((id) => ({ id, title: 'Test Task', description: 'Test Description', state: 'pending' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ id })),
};

describe('TasksController', () => {
    let controller: TasksController;
    let service: TasksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: mockTasksService,
                },
            ],
        }).compile();

        controller = module.get<TasksController>(TasksController);
        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a task', async () => {
            const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'Task description', state: 'pending' };
            const result = await controller.create(createTaskDto);
            expect(result).toEqual({ id: 1, ...createTaskDto });
            expect(service.create).toHaveBeenCalledWith(createTaskDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const result = await controller.findAll();
            expect(result).toEqual([{ id: 1, title: 'Test Task', description: 'Test Description', state: 'pending' }]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a task by id', async () => {
            const result = await controller.findOne(1);
            expect(result).toEqual({ id: 1, title: 'Test Task', description: 'Test Description', state: 'pending' });
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a task', async () => {
            const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Description', state: 'complete' };
            const result = await controller.update(1, updateTaskDto);
            expect(result).toEqual({ id: 1, ...updateTaskDto });
            expect(service.update).toHaveBeenCalledWith(1, updateTaskDto);
        });
    });

    describe('remove', () => {
        it('should remove a task', async () => {
            const result = await controller.remove(1);
            expect(result).toEqual({ id: 1 });
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
