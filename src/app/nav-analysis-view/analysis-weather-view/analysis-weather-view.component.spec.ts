import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisWeatherViewComponent } from './analysis-weather-view.component';

describe('AnalysisWeatherViewComponent', () => {
  let component: AnalysisWeatherViewComponent;
  let fixture: ComponentFixture<AnalysisWeatherViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisWeatherViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisWeatherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
