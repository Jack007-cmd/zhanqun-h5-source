import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {ScrollEventModule} from "ngx-scroll-event";
import {HkAboutItemComponent} from "../pages/hk/hk-about-item/hk-about-item";

@NgModule({
  declarations: [HkAboutItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    ScrollEventModule],
  exports: [CommonModule, HkAboutItemComponent]
})

export class HKCommonModule {

}
