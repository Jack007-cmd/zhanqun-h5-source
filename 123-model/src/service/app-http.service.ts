import {Injectable} from "@angular/core";
import {Http, Response, Headers} from '@angular/http';
import {HTTP} from "@ionic-native/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {AppConfig} from "./app-config.service";

@Injectable()
export class AppHttp {
  private isNative: boolean = !!(<any>window).cordova;

  constructor(private http: Http, private nativeHttp: HTTP, private appConfig: AppConfig) {

  }
  get(url: string,params?:{},headers?:Headers,timeout?:number,isWapApi?:boolean){
    url = this.generateUrl(url,params,isWapApi);
    // console.log(url);
    if(!timeout)timeout = 10000;
    return this.isNative?this.nativeGet(url,timeout/1000):this.httpGet(url,timeout);
  }

  private httpGet(url,timeout){
    let headers = this.generateHeader();
    return this.http.get(url, {headers:headers}).timeout(timeout).toPromise()
      .then((res: Response)=>{
        return this.success(res.json());
      },(res:Response)=>{
        return this.error(res);
      })
  }

  private nativeGet(url,timeout){
    this.nativeHttp.setRequestTimeout(timeout);
    let headers = this.generateNativeHeader();
    console.log(url);
    return this.nativeHttp.get(url,{},headers).then((res)=>{
      return this.success(JSON.parse(res.data));
    },(res)=>{
      return this.error(res);
    })
  }

  private generateHeader(): Headers {
   // let uuid = this.appConfig.uuid ? this.appConfig.uuid : '';

    let headers = new Headers();
   headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  }

  private generateNativeHeader() {
  //  let uuid = this.appConfig.uuid ? this.appConfig.uuid : '';

    return {
   //   'uuid': uuid,
      'Accept': 'application/json,text/plain,*/*',
      'Access-Control-Allow-Origin':'*'
    };
  }

  private generateBody(body: {}): string {
    let bodyStr: string = '';
    if (!body) return bodyStr;
    for (var key in body) {
      if (body[key] || body[key] == false || body[key] == 0) {
        bodyStr += key + '=' + body[key] + '&';
      }
    }
    bodyStr = bodyStr.substring(0, bodyStr.length - 1);
    return bodyStr;
  }

  private generateNativeBody(body: {}) {
    let newBody = {};
    if (!body) return newBody;
    for (var key in body) {
      if (body[key] || body[key] == false || body[key] == 0) {
        newBody[key] = body[key];
      }
    }
    return newBody;
  }

  generateUrl(url: string, params?: {}, isWapApi?: boolean): string {
    // !this.appConfig.localhost &&
    if ( url.indexOf('http') != 0 && url.indexOf('https') != 0) {
      if (isWapApi) {
         url = this.appConfig.h5Host + url;
        // url = "http://192.168.0.200" + url;
      } else {
        // url = "http://192.168.0.200" + url;
         url = this.appConfig.apiHost + url;
      }
    }
    // else{
      //url = "http://192.168.0.200" + url;
    //    url = this.appConfig.apiHost + url;
    // }
    url += url.indexOf("?") > 0 ? "&" : "?";
    url += 'aid=' + this.appConfig.agentId;
    url += '&clientType=' + (this.appConfig.platform == 'ios' ? 5 : 4);
    url += '&cv=' + this.appConfig.version;
    url += '&uuid=' +(this.appConfig.uuid ? this.appConfig.uuid : '');

    if (params) {
      for (var key in params) {
        if (params[key] || params[key] == false || params[key] == 0) {
          url += '&' + key + '=' + params[key];
        }
      }
    }
    return url;
  }

  error(error: any) {
    if (!this.isNative) {
      console.log("http request error:");
      console.log(error);
    }
    let errorMsg = {message: '系统异常，请稍后再试'};
    if (error && error.name == 'TimeoutError') {
      errorMsg = {message: '请求超时，请稍后再试'};
    } else if (error && error.status != 200) {
      errorMsg = {message: '网络异常，请稍后再试'};
    } else if (error && error.message) {
      errorMsg.message = error.message;
    }
    return errorMsg;
  }

  success(result) {

    return result;
  }

  nativePost(url, body, timeout) {
    this.nativeHttp.setRequestTimeout(timeout);
    let headers = this.generateNativeHeader();
    headers['Content-type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    body = this.generateNativeBody(body);
    return this.nativeHttp.post(url, body, headers).then((res: any) => {
      return this.success(JSON.parse(res.data));
    }, (res: Response) => {
      return this.error(res);
    });
  }

  post(url: string, body?: {}, headers?: Headers, timeout?: number, isWapApi?: boolean) {
    url = this.generateUrl(url, null, isWapApi);
    let bodyStr = this.generateBody(body);
    if (!timeout) timeout = 5000;

    return this.isNative ? this.nativePost(url, body, timeout / 1000) : this.httpPost(url, bodyStr, headers, timeout);
  }

  private httpPost(url, body, headers, timeout) {
    headers = this.generateHeader();
    headers.set('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url, body, {headers: headers}).timeout(timeout).toPromise().then((res: Response) => {
      return this.success(res.json());
    }, (res: Response) => {
      return this.error(res);
    });
  }


}
