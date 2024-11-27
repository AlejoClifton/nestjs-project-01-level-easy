import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { Task } from '@/tasks/entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

const mockTaskRepository = {
    save: jest.fn().mockResolvedValue('Seed ejecutado correctamente'),
};

describe('SeedService', () => {
    let service: SeedService;
    let taskRepository: typeof mockTaskRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeedService,
                {
                    provide: getRepositoryToken(Task),
                    useValue: mockTaskRepository,
                },
            ],
        }).compile();

        service = module.get<SeedService>(SeedService);
        taskRepository = module.get<typeof mockTaskRepository>(getRepositoryToken(Task));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('executeSeed', () => {
        it('should call save and return success message', async () => {
            const result = await service.executeSeed();
            expect(taskRepository.save).toHaveBeenCalled();
            expect(result).toBe('Seed ejecutado correctamente');
        });

        it('should handle errors gracefully and throw InternalServerErrorException', async () => {
            taskRepository.save.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.executeSeed()).rejects.toThrow(InternalServerErrorException);
            expect(taskRepository.save).toHaveBeenCalled();
        });
    });
});
