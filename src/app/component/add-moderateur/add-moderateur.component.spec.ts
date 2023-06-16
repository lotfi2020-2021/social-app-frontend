import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModerateurComponent } from './add-moderateur.component';

describe('AddModerateurComponent', () => {
  let component: AddModerateurComponent;
  let fixture: ComponentFixture<AddModerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModerateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
