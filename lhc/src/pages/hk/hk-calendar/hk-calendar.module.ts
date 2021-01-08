import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkCalendarPage } from './hk-calendar';

@NgModule({
  declarations: [
    HkCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(HkCalendarPage),
  ],
})
export class HkCalendarPageModule {}
