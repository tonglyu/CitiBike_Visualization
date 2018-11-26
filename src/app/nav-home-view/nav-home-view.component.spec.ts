import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHomeViewComponent } from './nav-home-view.component';

describe('NavHomeViewComponent', () => {
  let component: NavHomeViewComponent;
  let fixture: ComponentFixture<NavHomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavHomeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
