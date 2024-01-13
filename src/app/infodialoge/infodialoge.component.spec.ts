import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfodialogeComponent } from './infodialoge.component';

describe('InfodialogeComponent', () => {
  let component: InfodialogeComponent;
  let fixture: ComponentFixture<InfodialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfodialogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfodialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
