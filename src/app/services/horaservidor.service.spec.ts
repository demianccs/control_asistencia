import { TestBed } from '@angular/core/testing';

import { HoraservidorService } from './horaservidor.service';

describe('HoraservidorService', () => {
  let service: HoraservidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraservidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
