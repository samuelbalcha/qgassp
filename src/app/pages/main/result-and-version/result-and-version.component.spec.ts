import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAndVersionComponent } from './result-and-version.component';

describe('ResultAndVersionComponent', () => {
  let component: ResultAndVersionComponent;
  let fixture: ComponentFixture<ResultAndVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultAndVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultAndVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
