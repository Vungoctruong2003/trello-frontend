import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditTitleComponent } from './list-edit-title.component';

describe('ListEditTitleComponent', () => {
  let component: ListEditTitleComponent;
  let fixture: ComponentFixture<ListEditTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEditTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
