import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCalcComponent } from './average-calc.component';

describe('AverageCalcComponent', () => {
  let component: AverageCalcComponent;
  let fixture: ComponentFixture<AverageCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
