import { Test, TestingModule } from '@nestjs/testing';
import { KakuregaService } from './kakurega.service';

describe('KakuregaService', () => {
  let service: KakuregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakuregaService],
    }).compile();

    service = module.get<KakuregaService>(KakuregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
