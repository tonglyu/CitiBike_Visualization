import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisInfrasViewComponent } from './analysis-infras-view.component';

describe('AnalysisInfrasViewComponent', () => {
  let component: AnalysisInfrasViewComponent;
  let fixture: ComponentFixture<AnalysisInfrasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisInfrasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisInfrasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
