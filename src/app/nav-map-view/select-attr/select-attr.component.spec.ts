import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttrComponent } from './select-attr.component';

describe('SelectAttrComponent', () => {
  let component: SelectAttrComponent;
  let fixture: ComponentFixture<SelectAttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAttrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
