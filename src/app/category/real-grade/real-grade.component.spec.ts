import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealGradeComponent } from './real-grade.component';

describe('RealGradeComponent', () => {
  let component: RealGradeComponent;
  let fixture: ComponentFixture<RealGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
