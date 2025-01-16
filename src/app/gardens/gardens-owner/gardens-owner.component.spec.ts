import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensOwnerComponent } from './gardens-owner.component';

describe('GardensOwnerComponent', () => {
  let component: GardensOwnerComponent;
  let fixture: ComponentFixture<GardensOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardensOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardensOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
