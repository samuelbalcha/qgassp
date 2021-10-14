import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUseOfEnergyComponent } from './end-use-of-energy.component';

describe('EndUseOfEnergyComponent', () => {
  let component: EndUseOfEnergyComponent;
  let fixture: ComponentFixture<EndUseOfEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndUseOfEnergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndUseOfEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
