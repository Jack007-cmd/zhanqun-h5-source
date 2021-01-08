import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkNewsPage } from './hk-news';

@NgModule({
  declarations: [
    HkNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(HkNewsPage),
  ],
})
export class HkNewsPageModule {}
