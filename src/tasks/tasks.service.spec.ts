import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

const mockTaskRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('TasksService', () => {
    let service: TasksService;
    let taskRepository: typeof mockTaskRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(Task),
                    useValue: mockTaskRepository,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        taskRepository = module.get<typeof mockTaskRepository>(getRepositoryToken(Task));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new task', async () => {
            const dto = { title: 'Test Task', description: 'Description', state: 'pending' };
            const result = { id: 1, ...dto, state: 'pending' };

            taskRepository.save.mockResolvedValue(result);

            expect(await service.create(dto)).toEqual(result);
            expect(taskRepository.save).toHaveBeenCalledWith({
                state: 'pending',
                ...dto,
            });
        });

        it('should throw InternalServerErrorException if an error occurs during task creation', async () => {
            const dto = { title: 'Test Task', description: 'Description', state: 'pending' };
            const error = new Error('Error creating task');
            taskRepository.save.mockRejectedValue(error);

            await expect(service.create(dto)).rejects.toThrow(InternalServerErrorException);
            expect(taskRepository.save).toHaveBeenCalledWith({
                state: 'pending',
                ...dto,
            });
        });
    });

    describe('findAll', () => {
        it('should return all tasks', async () => {
            const result = [{ id: 1, title: 'Task 1' }];
            taskRepository.find.mockResolvedValue(result);

            expect(await service.findAll()).toEqual(result);
            expect(taskRepository.find).toHaveBeenCalled();
        });

        it('should throw InternalServerErrorException when update fails', async () => {
            const error = new Error('Database error');
            taskRepository.find.mockRejectedValue(error);

            await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
            expect(taskRepository.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a task if found', async () => {
            const result = { id: 1, title: 'Task 1' };
            taskRepository.findOneBy.mockResolvedValue(result);

            expect(await service.findOne(1)).toEqual(result);
            expect(taskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        });

        it('should throw NotFoundException if task not found', async () => {
            taskRepository.findOneBy.mockResolvedValue(null);

            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update the task with new title', async () => {
            const existingTask = { id: 1, title: 'Old Title', description: 'Old Desc', state: 'pending' };
            const updateTaskDto = { title: 'New Title' };
            taskRepository.findOneBy.mockResolvedValue(existingTask);
            taskRepository.update.mockResolvedValue(null);

            const result = await service.update(1, updateTaskDto);

            expect(result.title).toEqual('New Title');
        });

        it('should keep the original title if updateTaskDto.title is undefined', async () => {
            const existingTask = { id: 1, title: 'Old Title', description: 'Old Desc', state: 'pending' };
            const updateTaskDto = { description: 'New Desc' };
            taskRepository.findOneBy.mockResolvedValue(existingTask);
            taskRepository.update.mockResolvedValue(null);

            const result = await service.update(1, updateTaskDto);

            expect(result.title).toEqual('Old Title');
        });

        it('should throw NotFoundException when task is not found', async () => {
            taskRepository.findOneBy.mockResolvedValue(null);

            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });

        it('should throw InternalServerErrorException when update fails', async () => {
            const error = new Error('Database error');
            taskRepository.findOneBy.mockResolvedValue({ id: 1, title: 'Task' });
            taskRepository.update.mockRejectedValue(error);

            await expect(service.update(1, { title: 'Updated Task' })).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('remove', () => {
        it('should remove the task', async () => {
            taskRepository.findOneBy.mockResolvedValue({ id: 1 });
            taskRepository.delete.mockResolvedValue(null);

            await service.remove(1);
            expect(taskRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if task not found', async () => {
            taskRepository.findOneBy.mockResolvedValue(null);

            await expect(service.remove(1)).rejects.toThrow(NotFoundException);
        });

        it('should throw InternalServerErrorException when update fails', async () => {
            const error = new Error('Database error');
            taskRepository.findOneBy.mockResolvedValue({ id: 1, title: 'Task' });
            taskRepository.delete.mockRejectedValue(error);

            await expect(service.remove(1)).rejects.toThrow(InternalServerErrorException);
        });
    });
});
