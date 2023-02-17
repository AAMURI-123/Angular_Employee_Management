import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEmployeeComponent } from './saved-employee.component';

describe('SavedEmployeeComponent', () => {
  let component: SavedEmployeeComponent;
  let fixture: ComponentFixture<SavedEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
