import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMapViewComponent } from './nav-map-view.component';

describe('NavMapViewComponent', () => {
  let component: NavMapViewComponent;
  let fixture: ComponentFixture<NavMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
