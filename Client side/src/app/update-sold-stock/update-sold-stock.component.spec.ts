import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoldStockComponent } from './update-sold-stock.component';

describe('UpdateSoldStockComponent', () => {
  let component: UpdateSoldStockComponent;
  let fixture: ComponentFixture<UpdateSoldStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSoldStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSoldStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
