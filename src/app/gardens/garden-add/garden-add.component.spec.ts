import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenAddComponent } from './garden-add.component';

describe('GardenAddComponent', () => {
  let component: GardenAddComponent;
  let fixture: ComponentFixture<GardenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
