import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWithMeFileComponent } from './shared-with-me-file.component';

describe('SharedWithMeFileComponent', () => {
  let component: SharedWithMeFileComponent;
  let fixture: ComponentFixture<SharedWithMeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedWithMeFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedWithMeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
