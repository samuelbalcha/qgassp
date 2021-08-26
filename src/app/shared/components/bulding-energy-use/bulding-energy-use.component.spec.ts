import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuldingEnergyUseComponent } from './bulding-energy-use.component';

describe('BuldingEnergyUseComponent', () => {
  let component: BuldingEnergyUseComponent;
  let fixture: ComponentFixture<BuldingEnergyUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuldingEnergyUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuldingEnergyUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
