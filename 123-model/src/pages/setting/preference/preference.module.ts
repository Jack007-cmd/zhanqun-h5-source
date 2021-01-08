import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencePage } from './preference';

@NgModule({
  declarations: [
    PreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(PreferencePage),
  ],
})
export class PreferencePageModule {}
