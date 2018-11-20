import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationChartComponent } from './station-chart.component';

describe('StationChartComponent', () => {
  let component: StationChartComponent;
  let fixture: ComponentFixture<StationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
