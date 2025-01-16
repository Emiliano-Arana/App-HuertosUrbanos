import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenEditComponent } from './garden-edit.component';

describe('GardenEditComponent', () => {
  let component: GardenEditComponent;
  let fixture: ComponentFixture<GardenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
