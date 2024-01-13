import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallfilesComponent } from './showallfiles.component';

describe('ShowallfilesComponent', () => {
  let component: ShowallfilesComponent;
  let fixture: ComponentFixture<ShowallfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
