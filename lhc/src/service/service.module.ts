import {NgModule} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {AppConfig} from "./app-config.service";
// import {GeneralService} from "./general.service";
import {AlertService} from "./alert.service";
// import {AboutService} from "../pages/about/about.service";
import {StorageService} from "./storage.service";
import {HKService} from "./hk.service";

@NgModule({
  providers:[
    AppHttp,
    AppConfig,
    AlertService,
    // GeneralService,
    // AboutService,
    HKService,
    StorageService
  ]
})

export class ServiceModule {

}








