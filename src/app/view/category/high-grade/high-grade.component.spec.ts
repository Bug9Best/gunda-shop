import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighGradeComponent } from './high-grade.component';

describe('HighGradeComponent', () => {
  let component: HighGradeComponent;
  let fixture: ComponentFixture<HighGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
