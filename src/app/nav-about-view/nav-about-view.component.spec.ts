import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAboutViewComponent } from './nav-about-view.component';

describe('NavAboutViewComponent', () => {
  let component: NavAboutViewComponent;
  let fixture: ComponentFixture<NavAboutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAboutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
