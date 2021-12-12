import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterComponent } from './mater.component';

describe('MaterComponent', () => {
  let component: MaterComponent;
  let fixture: ComponentFixture<MaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
