import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {

  apiHost:string;
  imgHost:string;
  h5Host:string;
  agentId:string;
  uuid:string = "test123456789";
  version:string = "0.0.1";
  platform:string;
  localhost:boolean = false;
  constructor(){
    let config:any = (<any>window).AppConfig;
    this.apiHost = config.apiHost;
    this.imgHost = config.imgHost;
    this.h5Host = config.h5Host;
    this.agentId = config.agentId;
    this.localhost = config.localhost;
  }

}
