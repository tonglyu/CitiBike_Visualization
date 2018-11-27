import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisAgeViewComponent } from './analysis-age-view.component';

describe('AnalysisAgeViewComponent', () => {
  let component: AnalysisAgeViewComponent;
  let fixture: ComponentFixture<AnalysisAgeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisAgeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisAgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
