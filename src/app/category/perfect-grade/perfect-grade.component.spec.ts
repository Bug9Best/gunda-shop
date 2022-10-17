import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectGradeComponent } from './perfect-grade.component';

describe('PerfectGradeComponent', () => {
  let component: PerfectGradeComponent;
  let fixture: ComponentFixture<PerfectGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfectGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfectGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
