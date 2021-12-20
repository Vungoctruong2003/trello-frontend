import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserIntoCardComponent } from './add-user-into-card.component';

describe('AddUserIntoCardComponent', () => {
  let component: AddUserIntoCardComponent;
  let fixture: ComponentFixture<AddUserIntoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserIntoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserIntoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
