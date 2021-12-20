import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserIntoCardcComponent } from './add-user-into-cardc.component';

describe('AddUserIntoCardcComponent', () => {
  let component: AddUserIntoCardcComponent;
  let fixture: ComponentFixture<AddUserIntoCardcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserIntoCardcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserIntoCardcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
