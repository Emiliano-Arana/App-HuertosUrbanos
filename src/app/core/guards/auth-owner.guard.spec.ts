import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authOwnerGuard } from './auth-owner.guard';

describe('authOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
