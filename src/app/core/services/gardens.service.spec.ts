import { TestBed } from '@angular/core/testing';

import { GardensService } from './gardens.service';

describe('GardensService', () => {
  let service: GardensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
