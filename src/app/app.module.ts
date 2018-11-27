import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapBoxComponent } from './nav-map-view/map-box/map-box.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectAttrComponent } from './nav-map-view/select-attr/select-attr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RouterModule, Routes } from '@angular/router';
import { NavMapViewComponent } from './nav-map-view/nav-map-view.component';
import { NavAnalysisViewComponent } from './nav-analysis-view/nav-analysis-view.component';
import { NavHomeViewComponent } from './nav-home-view/nav-home-view.component';
import { NavAboutViewComponent } from './nav-about-view/nav-about-view.component';
import { AnalysisInfrasViewComponent } from './nav-analysis-view/analysis-infras-view/analysis-infras-view.component';
import { AnalysisAgeViewComponent } from './nav-analysis-view/analysis-age-view/analysis-age-view.component';
import { AnalysisWeatherViewComponent } from './nav-analysis-view/analysis-weather-view/analysis-weather-view.component';

registerLocaleData(zh);

const appRoutes: Routes = [
  { path: 'home', component: NavHomeViewComponent },
  { path: 'map', component: NavMapViewComponent },
  { path: 'analysis', component: NavAnalysisViewComponent },
  { path: 'analysis/infrastructure', component: AnalysisInfrasViewComponent },
  { path: 'analysis/age', component: AnalysisAgeViewComponent },
  { path: 'analysis/weather', component: AnalysisWeatherViewComponent },
  { path: 'about', component: NavAboutViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    SelectAttrComponent,
    NavMapViewComponent,
    NavAnalysisViewComponent,
    NavHomeViewComponent,
    NavAboutViewComponent,
    AnalysisInfrasViewComponent,
    AnalysisAgeViewComponent,
    AnalysisWeatherViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
