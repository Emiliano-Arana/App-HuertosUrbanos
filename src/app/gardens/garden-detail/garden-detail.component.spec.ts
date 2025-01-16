import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDetailComponent } from './garden-detail.component';

describe('GardenDetailComponent', () => {
  let component: GardenDetailComponent;
  let fixture: ComponentFixture<GardenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
