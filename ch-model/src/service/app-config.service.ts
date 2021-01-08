import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {

  apiHost:string;
  imgHost:string;
  h5Host:string;
  hkHost:string;
  agentId:string;
  uuid:string = "test123456789";
  version:string = "0.0.4";
  platform:string;
  referrer:string;
  localhost:boolean = false;

  constructor(){
    let config:any = (<any>window).AppConfig;
    this.apiHost = config.apiHost;
    this.imgHost = config.imgHost;
    this.hkHost = config.hkHost;
    this.h5Host = config.h5Host;
    this.agentId = config.agentId;
    this.localhost = config.localhost;
  }

}
