import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectAttrComponent } from './select-attr/select-attr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { StationChartComponent } from './station-chart/station-chart.component';

registerLocaleData(zh); 

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    SelectAttrComponent,
    StationChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
