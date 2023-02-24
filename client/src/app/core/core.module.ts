import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page/start-page.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    StartPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    StartPageComponent
  ],
})
export class CoreModule { }
