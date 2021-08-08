import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLoaderComponent } from './module-loader.component';

describe('ModuleLoaderComponent', () => {
  let component: ModuleLoaderComponent;
  let fixture: ComponentFixture<ModuleLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
