import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAnalysisViewComponent } from './nav-analysis-view.component';

describe('NavAnalysisViewComponent', () => {
  let component: NavAnalysisViewComponent;
  let fixture: ComponentFixture<NavAnalysisViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAnalysisViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAnalysisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
