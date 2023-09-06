import { TestBed } from '@angular/core/testing';

import { WebsocketGpsService } from './websocket-gps.service';

describe('WebsocketGpsService', () => {
  let service: WebsocketGpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketGpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
