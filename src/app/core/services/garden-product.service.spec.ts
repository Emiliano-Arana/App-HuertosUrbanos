import { TestBed } from '@angular/core/testing';

import { GardenProductService } from './garden-product.service';

describe('GardenProductService', () => {
  let service: GardenProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
