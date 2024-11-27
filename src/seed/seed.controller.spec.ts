import { Test, TestingModule } from '@nestjs/testing';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

const mockSeedService = {
    executeSeed: jest.fn(() => [{ id: 1, title: 'Test Task', description: 'Test Description', state: 'pending' }]),
};

describe('SeedController', () => {
    let controller: SeedController;
    let service: SeedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeedController],
            providers: [
                {
                    provide: SeedService,
                    useValue: mockSeedService,
                },
            ],
        }).compile();

        controller = module.get<SeedController>(SeedController);
        service = module.get<SeedService>(SeedService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('execSeed', () => {
        it('should return an array of tasks', async () => {
            const result = await controller.executeSeed();
            expect(result).toEqual([{ id: 1, title: 'Test Task', description: 'Test Description', state: 'pending' }]);
            expect(service.executeSeed).toHaveBeenCalled();
        });
    });
});
