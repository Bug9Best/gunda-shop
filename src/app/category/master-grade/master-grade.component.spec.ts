import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGradeComponent } from './master-grade.component';

describe('MasterGradeComponent', () => {
  let component: MasterGradeComponent;
  let fixture: ComponentFixture<MasterGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
