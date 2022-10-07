import { Test, TestingModule } from '@nestjs/testing';
import { KakuregaController } from './kakurega.controller';

describe('KakuregaController', () => {
  let controller: KakuregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakuregaController],
    }).compile();

    controller = module.get<KakuregaController>(KakuregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
